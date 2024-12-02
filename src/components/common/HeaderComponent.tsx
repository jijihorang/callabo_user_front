import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../../assets/icons/atom.png";
import heart from "../../assets/icons/heart.png";
import cart from "../../assets/icons/cart.png";
import info from "../../assets/icons/info.png";

function HeaderComponent() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 상태 확인
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token); // 토큰이 존재하면 true, 없으면 false
    }, []);

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            navigate("/user"); // 로그인 상태일 때 사용자 정보 페이지로 이동
        } else {
            navigate("/login"); // 로그인되지 않은 상태라면 로그인 페이지로 이동
        }
    };

    return (
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
            {/* 로고 + 네비게이션 메뉴 */}
            <div className="flex items-center space-x-5 gap-2">
                {/* 로고 */}
                <h1 className="text-[30px] font-bold">
                    <Link to="/main">
                        <img src={logo} alt="로고 이미지" className="w-12 h-12 cursor-pointer" />
                    </Link>
                </h1>

                {/* 네비게이션 메뉴 */}
                <nav className="flex items-center space-x-6 text-[18px] font-medium">
                    <Link to="/creator" className="hover:text-blue-500">
                        Creator
                    </Link>
                    <Link to="/popup" className="hover:text-blue-500">
                        Event
                    </Link>
                </nav>
            </div>

            {/* 오른쪽 아이콘 */}
            <div className="flex items-center space-x-5 gap-1">
                {/* 하트 아이콘 */}
                <Link to="/wishlist">
                    <img src={heart} alt="찜하기" className="w-6 h-6 cursor-pointer" />
                </Link>

                {/* 쇼핑카트 아이콘 */}
                <Link to="/cart">
                    <img src={cart} alt="장바구니" className="w-7 h-7 cursor-pointer" />
                </Link>

                {/* 사용자 아이콘 */}
                <button onClick={handleUserIconClick} className="cursor-pointer">
                    <img src={info} alt="사용자" className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
}

export default HeaderComponent;
