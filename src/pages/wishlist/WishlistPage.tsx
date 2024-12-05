import { useState } from "react";
import WishlistProductComponent from "../../components/wishlist/WishlistProductComponent.tsx";
import WishlistCreatorComponent from "../../components/wishlist/WishlistCreatorComponent.tsx";

function WishlistPage() {
    const [activeTab, setActiveTab] = useState("products"); // 상태로 탭 전환 관리

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
