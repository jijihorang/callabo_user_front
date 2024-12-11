import { useState, useEffect } from "react";
import WishlistProductComponent from "../../components/customer/wishlist/WishlistProductComponent.tsx";
import WishlistCreatorComponent from "../../components/customer/wishlist/WishlistCreatorComponent.tsx";

function WishlistPage() {
    // 상태 초기화 시 localStorage에서 activeTab 값을 가져오거나 기본값으로 "products" 설정
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem("activeTab") || "products");

    // activeTab 상태가 변경될 때 localStorage에 저장
    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 탭 메뉴 */}
            <div className="flex justify-center space-x-8 mb-8">
                <button
                    className={`text-lg font-bold px-4 py-2 ${
                        activeTab === "products" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("products")}
                >
                    상품 찜
                </button>
                <button
                    className={`text-lg font-bold px-4 py-2 ${
                        activeTab === "creators" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("creators")}
                >
                    제작자 찜
                </button>
            </div>

            {/* 탭 내용 */}
            <div>
                {activeTab === "products" && <WishlistProductComponent />}
                {activeTab === "creators" && <WishlistCreatorComponent />}
            </div>
        </div>
    );
}

export default WishlistPage;
