import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuthStore from "../../stores/customer/AuthStore.ts"; // Zustand Store
import useCartStore from "../../stores/cart/cartStore.ts"; // Zustand Store
import logo from "/img/collabori.png";
import cart from "/icons/cart.png";
import menu from "/icons/menu.png";
import closeIcon from "/icons/close.png";

function HeaderComponent() {
    const { isLoggedIn, logout } = useAuthStore(); // 로그인 상태 및 로그아웃 함수 가져오기
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true); // 헤더 표시 상태
    const [lastScrollY, setLastScrollY] = useState(0); // 이전 스크롤 위치
    const scrollDelta = useRef(0);

    const totalQuantity = useCartStore((state) =>
        state.cartGroups.reduce(
            (total, group) =>
                total + group.products.reduce((groupTotal, product) => groupTotal + product.quantity, 0),
            0
        )
    ); // 장바구니 총 상품 갯수 계산

    const handleLogoutClick = () => {
        logout(); // 로그아웃 처리
        navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    };

    const menuItems = [
        { name: "크리에이터", url: "/creator" },
        { name: "오프라인 스토어", url: "/event/offlineStore" },
        ...(isLoggedIn
            ? [
                { name: "좋아요", url: "/header/wishlist" },
                { name: "장바구니", url: "/header/cart" },
                { name: "내 정보", url: "/header/user" },
                { name: "로그아웃", action: handleLogoutClick },
            ]
            : [
                { name: "로그인", url: "/login" },
            ]),
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Y축 차이 계산 및 누적
            const deltaY = currentScrollY - lastScrollY;
            scrollDelta.current += deltaY;

            // 누적된 Y축 이동값이 일정 수준 이상일 때만 헤더 상태 변경
            if (scrollDelta.current > 150) {
                setIsHeaderVisible(false); // 스크롤 다운 → 헤더 숨김
                scrollDelta.current = 0; // 누적값 초기화
            } else if (scrollDelta.current < -150) {
                setIsHeaderVisible(true); // 스크롤 업 → 헤더 표시
                scrollDelta.current = 0; // 누적값 초기화
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
            className={`fixed top-0 left-0 w-full z-50 bg-white transition-transform duration-300 ${
                isHeaderVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            {/* 상단 헤더 */}
            <div className="container mx-auto flex items-center justify-between px-2">
                {/* 로고 */}
                <div>
                    <Link to="/main">
                        <img src={logo} alt="로고 이미지" className="w-25 h-20 cursor-pointer" />
                    </Link>
                </div>

                {/* 데스크톱 네비게이션 */}
                <nav className="hidden lg:flex items-center space-x-6 text-[18px] font-medium ml-8">
                    {menuItems.map((item, index) =>
                        item.action ? (
                            <button
                                key={index}
                                onClick={item.action}
                                className="hover:text-blue-500 flex items-center space-x-2"
                            >
                                <span>{item.name}</span>
                            </button>
                        ) : (
                            <Link
                                key={item.url}
                                to={item.url}
                                className="hover:text-blue-500 flex items-center space-x-2"
                            >
                                <span>{item.name}</span>
                            </Link>
                        )
                    )}
                </nav>

                {/* 모바일 메뉴 버튼 */}
                <div className="lg:hidden flex items-center space-x-4">
                    <Link to="/header/cart" className="relative">
                        <img src={cart} alt="장바구니" className="w-7 h-7 cursor-pointer" />
                        {totalQuantity > 0 && (
                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalQuantity}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => setIsMenuOpen(true)}>
                        <img src={menu} alt="메뉴" className="w-7 h-7 cursor-pointer" />
                    </button>
                </div>
            </div>

            {/* 모바일 네비게이션 바 */}
            <div className="lg:hidden bg-gray-50 py-3">
                <nav className="flex items-center justify-around">
                    {menuItems.map((item, index) =>
                        item.action ? (
                            <button
                                key={index}
                                onClick={item.action}
                                className="text-sm font-medium text-gray-800 flex items-center space-x-2"
                            >
                                <span>{item.name}</span>
                            </button>
                        ) : (
                            <Link
                                key={item.url}
                                to={item.url}
                                className="text-sm font-medium text-gray-800 flex items-center space-x-2"
                            >
                                <span>{item.name}</span>
                            </Link>
                        )
                    )}
                </nav>
            </div>

            {/* 모바일 메뉴 */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 h-screen w-full transform transition-transform duration-300">
                    <div className="flex justify-between items-center px-5 py-4 border-b">
                        <h1 className="text-lg font-bold">Menu</h1>
                        <button onClick={() => setIsMenuOpen(false)}>
                            <img src={closeIcon} alt="닫기 버튼" className="w-6 h-6 cursor-pointer" />
                        </button>
                    </div>
                    <div className="bg-white h-full overflow-y-auto">
                        <nav className="space-y-8 px-8 py-6">
                            {menuItems.map((item, index) =>
                                item.action ? (
                                    <button
                                        key={index}
                                        onClick={item.action}
                                        className="block text-lg font-medium text-gray-800 hover:text-blue-500 transition"
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                    <Link
                                        key={item.url}
                                        to={item.url}
                                        className="block text-lg font-medium text-gray-800 hover:text-blue-500 transition"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

export default HeaderComponent;
