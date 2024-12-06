import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/customer/AuthStore.ts";

import faq from "../../assets/icons/faq.png";
import qa from "../../assets/icons/q&a.png"
import like from "../../assets/icons/like.png"
import order from "../../assets/icons/order.png"
import shoopringcart from "../../assets/icons/shoppingcart.png"
import review from "../../assets/icons/review.png"

import user from "../../assets/icons/userprofile.png"

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
                    src={customer?.customerProfileImage || user}
                    alt="프로필"
                    className="w-40 h-40 rounded-full"
                />
                <div className="text-center">
                    <p className="text-xl font-bold">{customer?.customerName ? `${customer.customerName}님, 반가워요!` : "비회원님, 반가워요!"}</p>
                    {customer?.customerId && <p className="text-sm text-gray-500">{customer.customerId}</p>}
                </div>
            </div>

            {/* 버튼들 */}
            <div className="flex space-x-4 mb-10">
                <Link
                    to="/customer/account"
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

            {/* 추가 섹션 - 아이콘 리스트 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6 w-full max-w-lg">
                <Link to="/header/wishlist" className="text-center">
                    <img src={like} alt="찜하기" className="w-16 h-16 mx-auto" />
                    <p className="text-sm mt-2">찜하기</p>
                </Link>
                <Link to="/header/cart" className="text-center">
                    <img src={shoopringcart} alt="장바구니" className="w-16 h-16 mx-auto" />
                    <p className="text-sm mt-2">장바구니</p>
                </Link>
                <Link to="" className="text-center">
                    <img src={review} alt="리뷰" className="w-16 h-16 mx-auto" />
                    <p className="text-sm mt-2">리뷰</p>
                </Link>
                <Link to="/faq" className="text-center">
                    <img src={faq} alt="FAQ" className="w-16 h-16 mx-auto" />
                    <p className="text-sm mt-2">FAQ</p>
                </Link>
                <Link to="" className="text-center">
                    <img src={qa} alt="Q&A" className="w-16 h-16 mx-auto" />
                    <p className="text-sm mt-2">Q&A</p>
                </Link>
                <Link to="" className="text-center">
                    <img src={order} alt="배송조회" className="w-16 h-16 mx-auto" />
                    <p className="text-sm mt-2">배송조회</p>
                </Link>
            </div>
        </div>
    );
}

export default UserInfoComponent;
