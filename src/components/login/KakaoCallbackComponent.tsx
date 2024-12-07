import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../../apis/login/KakaoLoginAPI.ts";
import useAuthStore from "../../stores/customer/AuthStore.ts";

function KakaoCallbackComponent() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser); // Zustand의 setUser 가져오기
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    const authCode: string | null = searchParams.get("code");

    useEffect(() => {
        if (authCode != null) {
            getAccessToken(authCode)
                .then((accessToken) => {
                    // 로컬 스토리지에 액세스 토큰 저장
                    localStorage.setItem("kakao_access_token", accessToken);

                    // 사용자 정보 가져오기
                    return getMemberWithAccessToken(accessToken).then((userData) => {
                        console.log("Setting Zustand State with:", {
                            customerName: userData.customerName,
                            customerId: userData.customerId,
                            customerProfileImage: userData.customerProfileImage,
                            accessToken,
                        });
                        setUser(userData.customerName, userData.customerId,userData.customerProfileImage, accessToken);// 값 전달
                    });
                })
                .then(() => {
                    setStatus("success");
                    navigate("/");
                })
                .catch(() => {
                    setStatus("error");
                });
        }
    }, [authCode, navigate, setUser]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-indigo-700">
            <div className="p-8 bg-white rounded-lg shadow-md text-center w-96">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Kakao Login</h1>
                {status === "loading" && (
                    <div>
                        <p className="text-gray-600">Processing your login...</p>
                        <div className="mt-4 w-8 h-8 border-4 border-indigo-500 border-t-transparent border-solid rounded-full animate-spin mx-auto"></div>
                    </div>
                )}
                {status === "success" && (
                    <div>
                        <p className="text-green-600 text-lg font-semibold">Login successful!</p>
                        <p className="text-gray-500 mt-2">Redirecting to the main page...</p>
                    </div>
                )}
                {status === "error" && (
                    <div>
                        <p className="text-red-600 text-lg font-semibold">Login failed</p>
                        <p className="text-gray-500 mt-2">Please try again.</p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                        >
                            Go to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default KakaoCallbackComponent;
