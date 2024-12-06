import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const CUSTOMER_KEY = "cvtmCtwf46RnuA58qXRAf";

interface Amount {
    currency: string;
    value: number;
}

function CheckoutPage() {
    const [amount, setAmount] = useState<Amount>({ currency: "KRW", value: 50_000 });
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

    const handleAmountChange = (checked: boolean): void => {
        const valueChange = checked ? -5_000 : 5_000;
        setAmount((prev) => ({ ...prev, value: prev.value + valueChange }));
    };

    const handlePayment = async (): Promise<void> => {
        if (!widgets) return;

        try {
            await widgets.requestPayment({
                orderId: "OUTOFWs2VFZg0iFhWMMm3",
                orderName: "토스 티셔츠 외 2건",
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
                customerEmail: "customer123@gmail.com",
                customerName: "김토스",
                customerMobilePhone: "01012341234",
            });
        } catch (error) {
            console.error("결제 요청 중 오류 발생:", error);
        }
    };

    return (
        <div className="wrapper">
            <div className="box_section">
                <div id="payment-method" />
                <div id="agreement" />

                <div>
                    <label htmlFor="coupon-box">
                        <input
                            id="coupon-box"
                            type="checkbox"
                            disabled={!ready}
                            onChange={(e) => handleAmountChange(e.target.checked)}
                        />
                        <span>5,000원 쿠폰 적용</span>
                    </label>
                </div>

                <button className="button" disabled={!ready} onClick={handlePayment}>
                    결제하기
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
