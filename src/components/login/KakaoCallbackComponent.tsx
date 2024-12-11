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
                    return getMemberWithAccessToken(accessToken).then((userData) => ({
                        accessToken,
                        userData,
                    }));
                })
                .then(({ accessToken, userData }) => {
                    console.log("User Data:", userData);
                    // 토큰과 사용자 정보를 상태에 저장
                    const refreshToken = "generated-refresh-token"; // 백엔드에서 받아온 refresh token
                    setUser(userData, accessToken, refreshToken);
                    setStatus("success");
                    navigate("/");
                })
                .catch((err) => {
                    console.error("Login Error:", err);
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
