import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const CUSTOMER_KEY = "cvtmCtwf46RnuA58qXRAf";

interface Amount {
    currency: string;
    value: number;
}

function CheckoutPage() {
    const { state } = useLocation();
    const orderData = state?.orderData;

    if (!orderData) {
        return <div>결제 정보가 없습니다. 다시 시도해주세요.</div>;
    }

    const [amount, setAmount] = useState<Amount>({
        currency: "KRW",
        value: orderData.totalPrice || 0, // 결제 금액 초기화
    });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState<any>(null);

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
                orderId: orderData.orderId || "DEFAULT_ORDER_ID", // orderId는 전달받은 데이터 사용
                orderName: orderData.items
                    ?.map((item) => item.productName)
                    .slice(0, 2)
                    .join(", ") + " 외 " + (orderData.items.length - 2) + "건",
                successUrl: `${window.location.origin}/tosspay/success`,
                failUrl: `${window.location.origin}/tosspay/fail`,
                customerEmail: orderData.customerEmail,
                customerName: orderData.recipientName, // 주문자 이름 적용
                customerMobilePhone: orderData.recipientPhone, // 주문자 연락처 적용
            });
        } catch (error) {
            console.error("결제 요청 중 오류 발생:", error);
        }
    };

    return (
        <div className="wrapper">
            <div className="box_section">
                <h2 className="text-xl font-bold mb-4">
                    결제자: {orderData.recipientName}님
                </h2>
                <h3 className="text-lg mb-4">
                    결제 금액: {amount.value.toLocaleString()}원
                </h3>
                <div id="payment-method" />
                <div id="agreement" />

                <button
                    className="button"
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
