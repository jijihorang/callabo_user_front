import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../../stores/customer/AuthStore.ts"; // Zustand Store
import logo from "../../assets/icons/atom.png";
import menu from "../../assets/icons/menu.png";
import closeIcon from "../../assets/icons/close.png"; // 닫기 버튼 아이콘

function HeaderComponent() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore(); // Zustand 상태 가져오기
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true); // 헤더 표시 상태
    const [lastScrollY, setLastScrollY] = useState(0); // 이전 스크롤 위치

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            navigate("/header/user"); // 로그인 상태일 때 사용자 정보 페이지로 이동
        } else {
            navigate("/login"); // 로그인되지 않은 상태라면 로그인 페이지로 이동
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setIsHeaderVisible(false); // 스크롤 다운 → 헤더 숨김
            } else {
                setIsHeaderVisible(true); // 스크롤 업 → 헤더 표시
            }

            setLastScrollY(currentScrollY); // 마지막 스크롤 위치 업데이트
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll); // 클린업
        };
    }, [lastScrollY]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-transform duration-300 ${
                isHeaderVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between px-5 py-3">
                {/* 로고 + 네비게이션 메뉴 */}
                <div className="flex items-center">
                    {/* 로고 */}
                    <h1 className="text-[30px] font-bold">
                        <Link to="/main">
                            <img src={logo} alt="로고 이미지" className="w-12 h-12 cursor-pointer" />
                        </Link>
                    </h1>
                </div>

                {/* 모바일 메뉴 아이콘 */}
                <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
                    <img src={menu} alt="메뉴" className="w-7 h-7 cursor-pointer" />
                </button>
            </div>

            {/* 모바일 메뉴 */}
            <div
                className={`fixed inset-0 z-50 h-screen w-full bg-white transform transition-transform duration-500 ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >

                {/* 메뉴 헤더 */}
                <div className="bg-gray-200 flex items-center justify-center px-5 py-4 shadow-md relative">
                    <h1 className="text-xl font-bold text-gray-800">Menu</h1>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute right-5 top-4"
                    >
                        <img src={closeIcon} alt="닫기 버튼" className="w-6 h-6" />
                    </button>
                </div>

                {/* 메뉴 리스트 */}
                <div className="bg-white h-full overflow-y-auto">
                    <nav className="space-y-8 px-8 py-6">
                        {/* 내 계정 */}
                        <button
                            onClick={() => {
                                handleUserIconClick();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center space-x-6 hover:text-blue-500 transition"
                        >
                            <img
                                src="/src/assets/icons/userprofile.png"
                                alt="내 계정"
                                className="w-8 h-8 object-cover"
                            />
                            <span className="text-lg font-medium text-gray-800">내 계정</span>
                        </button>

                        {/* 크리에이터 */}
                        <Link
                            to="/creator"
                            className="flex items-center space-x-6 hover:text-blue-500 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img src="/src/assets/icons/creator.png" alt="크리에이터" className="w-8 h-8" />
                            <span className="text-lg font-medium text-gray-800">크리에이터</span>
                        </Link>

                        {/* 오프라인 스토어 */}
                        <Link
                            to="/event/offlineStore"
                            className="flex items-center space-x-6 hover:text-blue-500 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img src="/src/assets/icons/offlinestore.png" alt="오프라인 스토어" className="w-8 h-8" />
                            <span className="text-lg font-medium text-gray-800">오프라인 스토어</span>
                        </Link>

                        {/* 찜한 상품 */}
                        <Link
                            to="/header/wishlist"
                            className="flex items-center space-x-6 hover:text-blue-500 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img src="/src/assets/icons/heart.png" alt="찜한 상품" className="w-8 h-8" />
                            <span className="text-lg font-medium text-gray-800">찜한 상품</span>
                        </Link>

                        {/* 장바구니 */}
                        <Link
                            to="/header/cart"
                            className="flex items-center space-x-6 hover:text-blue-500 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img src="/src/assets/icons/cart.png" alt="장바구니" className="w-8 h-8" />
                            <span className="text-lg font-medium text-gray-800">장바구니</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;
