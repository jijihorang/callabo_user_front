import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SuccessPage () {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const requestData = {
            orderId: searchParams.get("orderId") || "",
            amount: searchParams.get("amount") || "",
            paymentKey: searchParams.get("paymentKey") || "",
        };

        const confirmPayment = async (): Promise<void> => {
            try {
                const response = await fetch("/confirm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    // 서버로부터 실패 응답을 받은 경우 처리
                    const errorResponse = await response.json();
                    navigate(`/fail?message=${errorResponse.message}&code=${errorResponse.code}`);
                    return;
                }

                // 결제 성공 시 추가 비즈니스 로직 구현 가능
                console.log("결제 성공!");
            } catch (error) {
                console.error("Error confirming payment:", error);
                navigate("/fail?message=Payment confirmation failed");
            }
        };

        confirmPayment();
    }, [navigate, searchParams]);

    return (
        <div className="result wrapper">
            <div className="box_section">
                <h2>결제 성공</h2>
                <p>{`주문번호: ${searchParams.get("orderId") || "N/A"}`}</p>
                <p>{`결제 금액: ${Number(
                    searchParams.get("amount") || 0
                ).toLocaleString()}원`}</p>
                <p>{`결제 키: ${searchParams.get("paymentKey") || "N/A"}`}</p>
            </div>
        </div>
    );
};

export default SuccessPage;
