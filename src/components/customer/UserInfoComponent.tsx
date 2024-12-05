import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/customer/AuthStore.ts";

function UserInfoComponent() {
    const { customer, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        alert("로그아웃 되었습니다.");
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
            {/* 프로필 이미지 및 사용자 정보 */}
            <div className="flex flex-col items-center space-y-4">
                <img
                    src={customer?.customerProfileImage || "default-profile-image.png"}
                    alt="프로필"
                    className="w-40 h-40 rounded-full"
                />
                <div className="text-center">
                    <p className="text-xl font-bold">{customer?.customerName ? `${customer.customerName}님, 반가워요!` : "비회원님, 반가워요!"}</p>
                    {customer?.customerId && <p className="text-sm text-gray-500">{customer.customerId}</p>}
                </div>
            </div>

            {/* 버튼들 */}
            <div className="flex space-x-4">
                <Link
                    to="/account"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    계정 설정
                </Link>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default UserInfoComponent;
