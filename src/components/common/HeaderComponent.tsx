import {Link} from "react-router-dom";

import logo from "../../assets/icons/atom.png";

import heart from "../../assets/icons/heart.png";
import cart from "../../assets/icons/cart.png";
import user from "../../assets/icons/user.png";

function HeaderComponent() {
    return (
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
            {/* 로고 + 네비게이션 메뉴 */}
            <div className="flex items-center space-x-5 gap-2">
                {/* 로고 */}
                <h1 className="text-[30px] font-bold">
                    <Link to="/main">
                        <img src={logo} alt="로고 이미지"  className="w-12 h-12 cursor-pointer"/>
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
                <img
                    src={heart}
                    alt="찜하기"
                    className="w-6 h-6 cursor-pointer"
                />
                {/* 쇼핑카트 아이콘 */}
                <Link to="/cart">
                    <img
                        src={cart}
                        alt="장바구니"
                        className="w-6 h-6 cursor-pointer"
                    />
                </Link>
                {/* 사용자 아이콘 */}
                <Link to="/login">
                    <img
                        src={user}
                        alt="사용자"
                        className="w-6 h-6 cursor-pointer"/>
                </Link>
            </div>

        </div>
    );
}

export default HeaderComponent;