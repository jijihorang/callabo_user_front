import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/customer/AuthStore.ts"; // Zustand Store
import infoIcon from "../../../public/icons/info.png"; // 사용자 정보 아이콘

const LoginButtonComponent = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore(); // 로그인 상태 확인

    const handleLoginClick = () => {
        navigate("/login"); // 로그인 페이지로 이동
    };

    const handleUserInfoClick = () => {
        navigate("/header/user"); // 사용자 정보 페이지로 이동
    };

    return (
        <div className="flex items-center space-x-2">
            {isLoggedIn ? (
                <button
                    onClick={handleUserInfoClick}
                    className="flex items-center space-x-2 hover:text-blue-500 transition"
                >
                    <img
                        src={infoIcon}
                        alt="내 정보"
                        className="w-8 h-8 object-contain"
                    />
                </button>
            ) : (
                <button
                    onClick={handleLoginClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                    로그인
                </button>
            )}
        </div>
    );
};

export default LoginButtonComponent;
