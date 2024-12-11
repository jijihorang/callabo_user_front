import { IProduct } from "../../../types/product/iproduct.ts";
import LikeButton from "../ProductLikeButton.tsx";
import useAuthStore from "../../../stores/customer/AuthStore.ts";

function ProductInfoComponent({
                                  product,
                                  onAddToCart,
                                  onBuyNow,
                                  quantity,
                                  setQuantity,
                              }: {
    product: IProduct;
    onAddToCart: () => void;
    onBuyNow: () => void;
    quantity: number;
    setQuantity: (value: number) => void;
}) {
    const { customer } = useAuthStore();

    if (!product) {
        return (
            <div className="w-full max-w-md mx-auto text-gray-800">
                <p className="text-center text-gray-500">상품 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto text-gray-800">
            <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">{product.categoryName || "카테고리 없음"}</p>
                <div className="flex items-center justify-between relative">
                    <h1 className="text-3xl font-bold">{product.productName}</h1>
                    <div className="hidden md:block"> {/* 모바일에서 숨기기 */}
                        <LikeButton
                            customerId={customer?.customerId || ""}
                            productId={product.productNo}
                        />
                    </div>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-4">{product.productPrice.toLocaleString()}원</p>
            </div>

            {/* 수량 선택 */}
            <div className="mb-4 flex justify-between hidden md:flex"> {/* 모바일에서 숨기기 */}
                <div className="flex items-center">
                    <h3 className="text-lg font-medium">수량</h3>
                </div>
                <div>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1">
                        <button
                            className="px-2 py-1 font-bold text-lg focus:outline-none"
                            onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                        >
                            −
                        </button>
                        <span className="text-lg font-semibold text-gray-800">{quantity}</span>
                        <button
                            className="px-2 py-1 font-bold text-lg focus:outline-none"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* 총 상품 금액 */}
            <div className="mb-6 border-t border-black pt-4 flex justify-between hidden md:flex"> {/* 모바일에서 숨기기 */}
                <div className="flex items-center">
                    <h3 className="text-lg font-medium">총 상품 금액</h3>
                </div>
                <div>
                    <p className="text-2xl font-bold">{(product.productPrice * quantity).toLocaleString()}원</p>
                </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 mb-6 hidden md:flex"> {/* 모바일에서 숨기기 */}
                <button
                    className="flex-1 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    onClick={onAddToCart}
                >
                    장바구니
                </button>
                <button
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    onClick={onBuyNow}
                >
                    바로 구매하기
                </button>
            </div>
        </div>
    );
}

export default ProductInfoComponent;
