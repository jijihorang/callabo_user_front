import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../../apis/login/KakaoLoginAPI.ts";

function KakaoCallbackComponent() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // useNavigate 훅 사용

    const authCode: string | null = searchParams.get("code");

    useEffect(() => {
        if (authCode != null) {
            getAccessToken(authCode)
                .then((accessToken) => {
                    console.log(accessToken);
                    
                    localStorage.setItem("kakao_access_token", accessToken);

                    return getMemberWithAccessToken(accessToken);
                })
                .then((result) => {
                    console.log(result);
                    // 로그인 성공 시 메인 페이지로 이동
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Login failed:", error);
                });
        }
    }, [authCode, navigate]);
    return (
        <div>
            <div>Kakao Login Redirect</div>
        </div>
    );
}

export default KakaoCallbackComponent;
