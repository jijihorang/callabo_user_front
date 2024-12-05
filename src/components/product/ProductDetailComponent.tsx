import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cart/cartStore.ts";

function CartPage() {
    const { cartGroups, increaseQuantity, decreaseQuantity, removeProduct } = useCartStore();
    const navigate = useNavigate();

    const moveToOrder = () => {
        navigate(`/order`, { state: { cartGroups } }); // 주문 페이지로 그룹화된 데이터 전달
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
            {/* 상품 목록 영역 */}
            <div className="w-full md:w-2/3 space-y-8">
                <h2 className="text-2xl font-bold mb-2">장바구니</h2>
                {cartGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {/* 그룹 헤더 */}
                        <div className="border-t-2 border-gray-400 pb-4 pt-3 flex items-center">
                            <input type="checkbox" className="mr-4" />
                            <h3 className="text-lg font-bold flex items-center">
                                {group.groupName || `Creator ${group.creatorId}`}
                                <span role="img" aria-label="배송" className="ml-2">
                                    📦
                                </span>
                            </h3>
                        </div>

                        {/* 그룹 내 상품 목록 */}
                        {group.products.map((product, productIndex) => (
                            <div
                                key={product.id}
                                className="py-3 flex flex-col space-y-3 relative border rounded-lg p-4"
                            >
                                {/* 삭제 버튼 */}
                                <button
                                    onClick={() => removeProduct(groupIndex, productIndex)}
                                    className="absolute top-2 right-2 w-6 h-6 flex justify-center items-center text-gray-500 hover:text-red-600"
                                    aria-label="삭제"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                {/* 상품 정보 */}
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
                                {/* 수량 및 가격 정보 */}
                                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span>수량 / {product.quantity}개</span>
                                        <button
                                            className="w-6 h-6 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
                                            onClick={() => decreaseQuantity(groupIndex, productIndex)}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="w-6 h-6 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
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
                        {/* 그룹 요약 */}
                        <div className="text-center mt-5 font-semibold border-t-2 border-gray-400 pt-5">
                            상품금액{" "}
                            {group.products
                                .reduce((acc, p) => acc + p.price * p.quantity, 0)
                                .toLocaleString()}
                            원 + 배송비 {group.shippingFee.toLocaleString()}원 = 주문금액{" "}
                            <span className="font-bold">
                                {(
                                    group.products.reduce(
                                        (acc, p) => acc + p.price * p.quantity,
                                        0
                                    ) + group.shippingFee
                                ).toLocaleString()}
                                원
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 주문 정보 영역 */}
            <div className="w-full md:w-1/3 md:ml-12 bg-white z-50 p-4 relative">
                <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-6 border-b-2 border-gray-400 pb-3 text-center">
                        주문정보
                    </h2>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">총 수량</span>
                        <span className="font-semibold">
                            {cartGroups.reduce(
                                (acc, group) =>
                                    acc +
                                    group.products.reduce((sum, p) => sum + p.quantity, 0),
                                0
                            )}
                            개
                        </span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">총 상품금액</span>
                        <span className="font-semibold">
                            {cartGroups
                                .reduce(
                                    (acc, group) =>
                                        acc +
                                        group.products.reduce(
                                            (sum, p) => sum + p.price * p.quantity,
                                            0
                                        ),
                                    0
                                )
                                .toLocaleString()}
                            원
                        </span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">총 배송비</span>
                        <span className="font-semibold">
                            {cartGroups.reduce((acc, group) => acc + group.shippingFee, 0).toLocaleString()}
                            원
                        </span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                        <span>총 주문금액</span>
                        <span className="text-blue-600">
                            {cartGroups
                                .reduce(
                                    (acc, group) =>
                                        acc +
                                        group.products.reduce(
                                            (sum, p) => sum + p.price * p.quantity,
                                            0
                                        ) +
                                        group.shippingFee,
                                    0
                                )
                                .toLocaleString()}
                            원
                        </span>
                    </div>
                    <button
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-semibold text-center hover:bg-blue-500"
                        onClick={moveToOrder}
                    >
                        주문서 작성
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
