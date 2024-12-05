import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cart/cartStore.ts";

function CartComponent() {
    const { cartGroups, increaseQuantity, decreaseQuantity, removeProduct } = useCartStore();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [startY, setStartY] = useState(0);
    const navigate = useNavigate();

    const moveToOrder = () => {
        navigate(`/order`);
    };

    // 터치 시작
    const handleTouchStart = (e: React.TouchEvent) => {
        setStartY(e.touches[0].clientY);
    };

    // 터치 이동
    const handleTouchMove = (e: React.TouchEvent) => {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 20) {
            setIsCollapsed(true);
        } else if (diff < -20) {
            setIsCollapsed(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
            {/* 상품 목록 영역 */}
            <div className="w-full md:w-2/3 space-y-8">
                <h2 className="text-2xl font-bold mb-2">장바구니</h2>
                {cartGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <div className="border-t-2 border-gray-400 pb-4 pt-3 flex items-center">
                            <input type="checkbox" className="mr-4" />
                            <h3 className="text-lg font-bold flex items-center">
                                {group.groupName}
                                <span role="img" aria-label="배송" className="ml-2">
                                    📦
                                </span>
                            </h3>
                        </div>
                        {group.products.map((product, productIndex) => (
                            <div
                                key={product.id}
                                className="py-3 flex flex-col space-y-3 relative border rounded-lg p-4"
                            >
                                {/* 삭제 버튼 */}
                                <button
                                    onClick={() => removeProduct(groupIndex, productIndex)}
                                    className="absolute top-2 right-2 w-6 h-6 flex justify-center items-center text-gray-500 hover:text-red-600"
                                >
                                    X
                                </button>
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-4" />
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="ml-5 flex-grow">
                                        <div className="font-semibold text-lg">{product.name}</div>
                                        <div className="text-gray-400 text-sm mt-1">
                                            {product.category}
                                        </div>
                                        <div className="text-lg font-bold mt-2">
                                            {product.price.toLocaleString()}원
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span>수량 / {product.quantity}개</span>
                                        <button
                                            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full"
                                            onClick={() => decreaseQuantity(groupIndex, productIndex)}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full"
                                            onClick={() => increaseQuantity(groupIndex, productIndex)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="font-bold">
                                        {(product.price * product.quantity).toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* 주문 정보 영역 */}
            <div
                className={`w-full md:w-1/3 md:ml-12 bg-white p-4 ${
                    window.innerWidth < 768
                        ? `fixed bottom-0 left-0 shadow-lg ${
                            isCollapsed ? "translate-y-[80%]" : "translate-y-0"
                        }`
                        : "relative"
                }`}
                onTouchStart={window.innerWidth < 768 ? handleTouchStart : undefined}
                onTouchMove={window.innerWidth < 768 ? handleTouchMove : undefined}
            >
                {/* 주문 정보 */}
                <button
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md"
                    onClick={moveToOrder}
                >
                    주문서 작성
                </button>
            </div>
        </div>
    );
}

export default CartComponent;
