import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

function KakaoCallbackComponent() {
    const navigate = useNavigate();

    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        const KakaoLogin = async () => {
            await axios ({
                method: "GET",
                url: `${import.meta.env.VITE_KAKAO_REDIRECT_URI}/?code=${code}`
            }). then((res) => {
                console.log(res);
                localStorage.setItem("name", res.data.name)
                navigate("/");
            })
        }
        KakaoLogin();
    });

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg font-bold">Kakao 인증 중...</p>
        </div>
    );
}

export default KakaoCallbackComponent;