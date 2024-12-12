import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SuccessPage() {
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
                const response = await fetch("/api2/confirm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...requestData,
                        status: 1, // 상태 업데이트를 요청
                    }),
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    navigate(`/fail?message=${errorResponse.message}&code=${errorResponse.code}`);
                    return;
                }

                console.log("결제 성공!");
            } catch (error) {
                console.error("Error confirming payment:", error);
                navigate("/fail?message=Payment confirmation failed");
            }
        };

        confirmPayment();
    }, [navigate, searchParams]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <svg
                    className="w-20 h-20 text-green-500 mx-auto mb-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm5.93 7.36L10.71 16.64a1 1 0 01-1.42 0l-3.18-3.18a1 1 0 011.42-1.42l2.47 2.47 6.39-6.39a1 1 0 011.42 1.42z" />
                </svg>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">결제가 성공적으로 완료되었습니다!</h1>
                <p className="text-gray-600 mb-4">
                    아래 주문 정보를 확인하세요.
                </p>
                <div className="bg-gray-50 border rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                        <strong>주문번호:</strong> {searchParams.get("orderId") || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>결제 금액:</strong> {Number(searchParams.get("amount") || 0).toLocaleString()}원
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>결제 키:</strong> {searchParams.get("paymentKey") || "N/A"}
                    </p>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    메인으로 돌아가기
                </button>
            </div>
        </div>
    );
}

export default SuccessPage;
