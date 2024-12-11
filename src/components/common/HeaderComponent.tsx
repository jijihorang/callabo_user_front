import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../../stores/customer/AuthStore.ts"; // Zustand Store
import logo from "../../../public/icons/atom.png";
import heart from "../../../public/icons/heart.png";
import cart from "../../../public/icons/cart.png";
import info from "../../../public/icons/info.png";
import menu from "../../../public/icons/menu.png";
import closeIcon from "../../../public/icons/close.png";
import useCartStore from "../../stores/cart/cartStore.ts"; // 닫기 버튼 아이콘

function HeaderComponent() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore(); // Zustand 상태 가져오기
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true); // 헤더 표시 상태
    const [lastScrollY, setLastScrollY] = useState(0); // 이전 스크롤 위치

    const totalQuantity = useCartStore((state) =>
        state.cartGroups.reduce(
            (total, group) =>
                total + group.products.reduce((groupTotal, product) => groupTotal + product.quantity, 0),
            0
        )
    ); // 장바구니 총 상품 갯수 계산

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

                {/* 모바일 메뉴 아이콘 + Cart 아이콘 */}
                <div className="lg:hidden flex items-center space-x-4 relative">
                    <Link to="/header/cart" className="relative">
                        <img src={cart} alt="장바구니" className="w-7 h-7 cursor-pointer" />
                        {totalQuantity > 0 && (
                            <span
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                            >
                        {totalQuantity}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => setIsMenuOpen(true)}>
                        <img src={menu} alt="메뉴" className="w-7 h-7 cursor-pointer" />
                    </button>
                </div>

                {/* 오른쪽 아이콘 (데스크톱 전용) */}
                <div className="hidden lg:flex items-center space-x-5">
                    <Link to="/header/wishlist">
                        <img src={heart} alt="찜하기" className="w-6 h-6 cursor-pointer" />
                    </Link>
                    <Link to="/header/cart" className="relative">
                        <img src={cart} alt="장바구니" className="w-7 h-7 cursor-pointer" />
                        {totalQuantity > 0 && (
                            <span
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                            >
                        {totalQuantity}
                            </span>
                        )}
                    </Link>
                    <button onClick={handleUserIconClick} className="cursor-pointer">
                        <img src={info} alt="사용자" className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 (화면 전체를 덮는 방식) */}
            <div
                className={`fixed inset-0 bg-white z-50 h-screen w-full transform transition-transform duration-300 lg:hidden ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* 닫기 버튼 */}
                <div className="flex justify-between items-center px-5 py-4 border-b">
                    <h1 className="text-lg font-bold">Menu</h1>
                    <button onClick={() => setIsMenuOpen(false)}>
                        <img src={closeIcon} alt="닫기 버튼" className="w-6 h-6 cursor-pointer" />
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
                                src="/icons/userprofile.png"
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
                            <img src="/icons/creator.png" alt="크리에이터" className="w-8 h-8" />
                            <span className="text-lg font-medium text-gray-800">크리에이터</span>
                        </Link>

                        {/* 오프라인 스토어 */}
                        <Link
                            to="/event/offlineStore"
                            className="flex items-center space-x-6 hover:text-blue-500 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img src="/icons/offlinestore.png" alt="오프라인 스토어" className="w-8 h-8" />
                            <span className="text-lg font-medium text-gray-800">오프라인 스토어</span>
                        </Link>

                        {/* 찜한 상품 */}
                        <Link
                            to="/header/wishlist"
                            className="flex items-center space-x-6 hover:text-blue-500 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img src="/icons/heart.png" alt="찜한 상품" className="w-8 h-8" />
                            <span className="text-lg font-medium text-gray-800">찜한 상품</span>
                        </Link>

                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;
