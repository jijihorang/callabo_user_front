import {loadTossPayments, TossPaymentsWidgets} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const CUSTOMER_KEY = "cvtmCtwf46RnuA58qXRAf";

interface Amount {
    currency: string;
    value: number;
}

interface OrderItem {
    productName: string;
    quantity: number;
    unitPrice: number;
}

interface OrderData {
    orderId: string;
    totalPrice: number;
    items: OrderItem[];
    recipientName: string;
    recipientPhone: string;
    customerEmail?: string;
}

function CheckoutPage() {

    const location = useLocation(); // 타입 파라미터 제거
    const orderData = (location.state as { orderData: OrderData })?.orderData; // 타입 단언 사용

    // const { state } =useLocation<{ orderData: OrderData }>();
    // const orderData = state?.orderData;

    const [amount] = useState<Amount>({
        currency: "KRW",
        value: orderData.totalPrice || 0,
    });

    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

    useEffect(() => {
        const fetchPaymentWidgets = async (): Promise<void> => {
            try {
                const tossPayments = await loadTossPayments(CLIENT_KEY);
                const initializedWidgets = tossPayments.widgets({ customerKey: CUSTOMER_KEY });
                setWidgets(initializedWidgets);
            } catch (error) {
                console.error("결제 위젯 초기화 중 오류 발생:", error);
            }
        };

        fetchPaymentWidgets();
    }, []);

    useEffect(() => {
        const renderPaymentWidgets = async (): Promise<void> => {
            if (!widgets) return;

            try {
                await widgets.setAmount(amount);

                await Promise.all([
                    widgets.renderPaymentMethods({
                        selector: "#payment-method",
                        variantKey: "DEFAULT",
                    }),
                    widgets.renderAgreement({
                        selector: "#agreement",
                        variantKey: "AGREEMENT",
                    }),
                ]);

                setReady(true);
            } catch (error) {
                console.error("결제 위젯 렌더링 중 오류 발생:", error);
            }
        };

        renderPaymentWidgets();
    }, [widgets, amount]);

    const handlePayment = async (): Promise<void> => {
        if (!widgets) return;

        try {
            await widgets.requestPayment({
                orderId: orderData.orderId || "DEFAULT_ORDER_ID",
                orderName: orderData.items
                    ?.map((item) => item.productName)
                    .slice(0, 2)
                    .join(", ") + " 외 " + (orderData.items.length - 2) + "건",
                successUrl: `${window.location.origin}/tosspay/success`,
                failUrl: `${window.location.origin}/tosspay/fail`,
                customerEmail: orderData.customerEmail,
                customerName: orderData.recipientName,
                customerMobilePhone: orderData.recipientPhone,
            });
        } catch (error) {
            console.error("결제 요청 중 오류 발생:", error);
        }
    };

    if (!orderData) {
        return (
            <div className="flex items-center justify-center h-screen text-center">
                <p className="text-lg font-bold text-gray-700">결제 정보가 없습니다. 다시 시도해주세요.</p>
            </div>
        );
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    결제자: <span className="text-blue-600">{orderData.recipientName}님</span>
                </h2>
                <h3 className="text-xl font-semibold text-gray-700 mb-6">
                    결제 금액: <span className="text-blue-600">{amount.value.toLocaleString()}원</span>
                </h3>

                <div id="payment-method" className="mb-6" />
                <div id="agreement" className="mb-6" />

                <button
                    className={`w-full py-3 rounded-lg text-white font-bold ${
                        ready ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!ready}
                    onClick={handlePayment}
                >
                    결제하기
                </button>
            </div>
        </div>
    );
}

export default CheckoutPage;
