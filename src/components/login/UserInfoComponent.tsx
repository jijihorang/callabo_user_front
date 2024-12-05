
import prod from "../../assets/img/pro1.png"
import {Link} from "react-router-dom";

function UserInfoComponent() {

    return (
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
            {/* 프로필 이미지 및 사용자 정보 */}
            <div className="flex flex-col items-center space-y-4">
                <img src={prod} alt="프로필" className="w-40 h-40 rounded-full" />
                <div className="text-center">
                    <p className="text-xl font-bold">최지호님, 반가워요!</p>
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
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                    로그아웃
                </button>
            </div>

            <hr className="border-gray-400 my-4 w-1/2" />

            {/* 하단 메뉴 */}
            <div className="flex space-x-6">
                <a href="#favorites" className="text-gray-600 hover:text-blue-500">
                    좋아요
                </a>
                <a href="#my-posts" className="text-gray-600 hover:text-blue-500">
                    내가 쓴 글
                </a>
                <a href="#cart" className="text-gray-600 hover:text-blue-500">
                    장바구니
                </a>
                <a href="#purchase-history" className="text-gray-600 hover:text-blue-500">
                    구매내역
                </a>
                <a href="#faq" className="text-gray-600 hover:text-blue-500">
                    FAQ
                </a>
            </div>
        </div>
    );
}

export default UserInfoComponent;
