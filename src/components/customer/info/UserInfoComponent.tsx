import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../../stores/customer/AuthStore.ts";

import faq from "../../../assets/icons/faq.png";
import qa from "../../../assets/icons/q&a.png"
import like from "../../../assets/icons/like.png"
import order from "../../../assets/icons/order.png"
import shoopringcart from "../../../assets/icons/shoppingcart.png"
import review from "../../../assets/icons/review.png"

import user from "../../../assets/icons/userprofile.png"
import {useState} from "react";
import {SweetAlertOptions} from "sweetalert2";
import AlertComponent from "../../common/AlertComponent.tsx";

function UserInfoComponent() {
    const { customer, logout } = useAuthStore();
    const navigate = useNavigate();

    const [alertOptions, setAlertOptions] = useState<SweetAlertOptions | null>(null);

    const handleLogout = () => {
        logout();
        navigate("/");

        setAlertOptions({
            title: "로그아웃",
            icon: "success",
            confirmButtonText: "확인",
        });

    };

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">

            {alertOptions && (
                <AlertComponent
                    options={alertOptions}
                    onClose={() => setAlertOptions(null)} // 알림 닫힐 때 초기화
                />
            )}

            {/* 프로필 섹션 */}
            <div className="p-8 w-full max-w-lg mb-10 text-center">
                <img
                    src={customer?.customerProfileImage || user}
                    alt="프로필"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <p className="text-2xl font-semibold mb-2">
                    {customer?.customerName ? `${customer.customerName}님, 반가워요!` : "비회원님, 반가워요!"}
                </p>
                {customer?.customerId && <p className="text-sm text-gray-500 mb-6">{customer.customerId}</p>}

                <div className="flex justify-center space-x-4">
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
            </div>

            {/* 아이콘 섹션 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 p-8 w-full max-w-4xl">
                <Link to="/header/wishlist" className="text-center">
                    <img src={like} alt="찜하기" className="w-16 h-16 mx-auto"/>
                    <p className="text-sm mt-2 font-semibold">찜하기</p>
                </Link>
                <Link to="/header/cart" className="text-center">
                    <img src={shoopringcart} alt="장바구니" className="w-16 h-16 mx-auto"/>
                    <p className="text-sm mt-2 font-semibold">장바구니</p>
                </Link>
                <Link to="" className="text-center">
                    <img src={review} alt="리뷰" className="w-16 h-16 mx-auto"/>
                    <p className="text-sm mt-2 font-semibold">작성한 리뷰</p>
                </Link>
                <Link to="/faq" className="text-center">
                    <img src={faq} alt="FAQ" className="w-16 h-16 mx-auto"/>
                    <p className="text-sm mt-2 font-semibold">FAQ</p>
                </Link>
                <Link to="/qna/list" className="text-center">
                    <img src={qa} alt="Q&A" className="w-16 h-16 mx-auto"/>
                    <p className="text-sm mt-2 font-semibold">Q&A</p>
                </Link>
                <Link to="/order/list" className="text-center">
                    <img src={order} alt="배송조회" className="w-16 h-16 mx-auto"/>
                    <p className="text-sm mt-2 font-semibold">주문 내역</p>
                </Link>
            </div>
        </div>


    );
}

export default UserInfoComponent;
