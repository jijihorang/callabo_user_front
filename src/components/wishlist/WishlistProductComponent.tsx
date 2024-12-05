import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import useAuthStore from "../../stores/customer/AuthStore";
import heart from "../../assets/icons/redheart.png";
import likeIcon from "../../assets/icons/redheart.png";
import {getLikedProducts} from "../../apis/customer/customerAPI.ts";
import {IWishlistProduct} from "../../types/wishlist/iwishlist.ts";

function WishlistProductComponent() {
    const navigate = useNavigate();
    const customerId = useAuthStore((state) => state.customer?.customerId); // Zustand에서 customerId 가져오기

    // React Query로 좋아요한 상품 가져오기
    const { data: likedProducts = [], isLoading } = useQuery<IWishlistProduct[]>({
        queryKey: ["likedProducts", customerId],
        queryFn: async () => {
            if (!customerId) {
                return Promise.reject(new Error("Customer ID is null"));
            }
            return getLikedProducts(customerId);
        },
        enabled: !!customerId,
        onError: (error) => {
            console.error("React Query 에러:", error);
        },
    });

    console.log(customerId)

    console.log(likedProducts.map((products)=>(
        products.id,
        products.img,
        products.name,
        products.id
        )
    ))

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <div className="flex items-center justify-center h-96">
                    <p className="text-gray-500 text-lg">로딩 중...</p>
                </div>
            ) : likedProducts.length > 0 ? (
                <>
                    <h2 className="text-xl font-bold mb-6">좋아요한 상품 ({likedProducts.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                        {likedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border border-gray-200 rounded-lg p-4 flex flex-col items-center"
                            >
                                <img
                                    src={product.img || likeIcon} // 기본 이미지 설정
                                    alt={product.name}
                                    className="w-40 h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-sm font-bold mb-2">{product.name}</h3>
                                <div className="text-blue-600 font-bold mb-2">
                                    {product.price.toLocaleString()}원
                                </div>
                                <button
                                    className="flex space-x-2 mt-3 bg-blue-500 text-white rounded-full px-4 py-2 shadow-lg hover:bg-blue-600 transition-all duration-300"
                                    onClick={() => navigate(`/product/detail/${product.id}`)}
                                >
                                    <img src={likeIcon} alt="찜" className="w-5 h-5" />
                                    <span className="font-semibold">상품 보기</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-96">
                    <img src={heart} alt="좋아요 아이콘" className="w-20 h-20 mb-6" />
                    <p className="text-lg font-bold mb-2">좋아요한 상품이 없어요.</p>
                    <p className="text-gray-600 mb-6">내 취향의 상품을 찾아보세요.</p>
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={() => navigate(`/creator/list`)}
                    >
                        상품 찾아보기
                    </button>
                </div>
            )}
        </div>
    );
}

export default WishlistProductComponent;
