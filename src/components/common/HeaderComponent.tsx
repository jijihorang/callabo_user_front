import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../../stores/customer/AuthStore.ts"; // Zustand Store
import logo from "../../assets/icons/atom.png";
import heart from "../../assets/icons/heart.png";
import cart from "../../assets/icons/cart.png";
import info from "../../assets/icons/info.png";
import menu from "../../assets/icons/menu.png";

function HeaderComponent() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore(); // Zustand 상태 가져오기
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            navigate("/header/user"); // 로그인 상태일 때 사용자 정보 페이지로 이동
        } else {
            navigate("/login"); // 로그인되지 않은 상태라면 로그인 페이지로 이동
        }
    };

    return (
        <header className="container mx-auto flex items-center justify-between px-5 py-5">
            {/* 로고 + 네비게이션 메뉴 */}
            <div className="flex items-center">
                {/* 로고 */}
                <h1 className="text-[30px] font-bold">
                    <Link to="/main">
                        <img src={logo} alt="로고 이미지" className="w-12 h-12 cursor-pointer" />
                    </Link>
                </h1>

                {/* 네비게이션 메뉴 (데스크톱 전용) */}
                <nav className="hidden lg:flex items-center space-x-6 text-[18px] font-medium ml-8">
                    <Link to="/creator" className="hover:text-blue-500">
                        Creator
                    </Link>
                    <Link to="/event/offlineStore" className="hover:text-blue-500">
                        Event
                    </Link>
                </nav>
            </div>

            {/* 모바일 메뉴 아이콘 */}
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={menu} alt="메뉴" className="w-7 h-7 cursor-pointer" />
            </button>

            {/* 오른쪽 아이콘 (데스크톱 전용) */}
            <div className="hidden lg:flex items-center space-x-5">
                <Link to="/header/wishlist">
                    <img src={heart} alt="찜하기" className="w-6 h-6 cursor-pointer" />
                </Link>
                <Link to="/header/cart">
                    <img src={cart} alt="장바구니" className="w-7 h-7 cursor-pointer" />
                </Link>
                <button onClick={handleUserIconClick} className="cursor-pointer">
                    <img src={info} alt="사용자" className="w-7 h-7" />
                </button>
            </div>

            {/* 모바일 메뉴 (토글) */}
            {isMenuOpen && (
                <nav className="absolute top-16 left-0 w-full bg-white shadow-lg lg:hidden">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        {/* 네비게이션 메뉴 */}
                        <li>
                            <Link
                                to="/creator"
                                className="text-[18px] font-medium hover:text-blue-500"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Creator
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/event/offlineStore"
                                className="text-[18px] font-medium hover:text-blue-500"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Event
                            </Link>
                        </li>

                        {/* 오른쪽 메뉴 아이콘 대신 텍스트로 */}
                        <li>
                            <Link
                                to="/header/wishlist"
                                className="text-[18px] font-medium hover:text-blue-500"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Wishlist
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/header/cart"
                                className="text-[18px] font-medium hover:text-blue-500"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Cart
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    handleUserIconClick();
                                    setIsMenuOpen(false);
                                }}
                                className="text-[18px] font-medium hover:text-blue-500"
                            >
                                My Page
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default HeaderComponent;
