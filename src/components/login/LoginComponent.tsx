import close from "../../../public/icons/close.png";
import kakao_logo from "../../../public/login/kakao.png";
import profile from "../../../public/login/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../../apis/login/KakaoLoginAPI.ts";

function LoginComponent() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/"); // 메인 화면으로 리다이렉션
    };

    const kakao = getKakaoLoginLink();

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[400px] min-h-[500px] p-6 relative flex flex-col">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                    onClick={handleClose}
                >
                    <img src={close} alt="닫기 이미지" className="w-5 h-5" />
                </button>

                {/* 중앙 콘텐츠 */}
                <div className="flex flex-col items-center justify-center flex-1">
                    <div>
                        <img src={profile} alt="프로필 이미지" className="w-24 h-24 mb-9" />
                    </div>
                    <h2 className="text-4xl text-black font-bold">로그인</h2>
                    <p className="text-black text-sm mt-3 text-center">
                        로그인 하고 신상품들을 만나보세요!
                    </p>

                    {/* 카카오 로그인 버튼 */}
                    <Link
                        to={kakao}
                        className="mt-10 px-6 py-2 rounded-lg flex items-center"
                    >
                        <img src={kakao_logo} alt="카카오 로고" />
                    </Link>
                </div>

                {/* 개인정보 보호 정책 */}
                <div className="border-t pt-4">
                    <p className="text-gray-600 text-xs text-center">
                        개인 정보 보호 정책 및 서비스 약관에 동의 하는것을 의미하며,<br />
                        서비스 이용을 위해 '이름, 프로필, 이메일' 수집합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
