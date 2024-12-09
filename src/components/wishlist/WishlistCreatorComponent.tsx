import profileImg from "../../assets/img/pro1.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getLikedCreators } from "../../apis/customer/customerAPI.ts";
import useAuthStore from "../../stores/customer/AuthStore.ts";
import { ILikedCreators } from "../../types/wishlist/iwishlist.ts";
import FollowButton from "../creator/FollowButton.tsx";

function WishlistCreatorComponent() {
    const navigate = useNavigate();
    const customerId = useAuthStore((state) => state.customer?.customerId); // Zustand에서 customerId 가져오기

    // React Query로 좋아요한 크리에이터 가져오기
    const {
        data: creators = [],
        isLoading,
        refetch, // 새로고침을 위한 함수
    } = useQuery<ILikedCreators[]>({
        queryKey: ["likedCreators", customerId],
        queryFn: async () => {
            if (!customerId) {
                return Promise.reject(new Error("Customer ID is null")); // customerId가 없으면 에러 반환
            }
            return getLikedCreators(customerId); // API 호출
        },
        enabled: !!customerId, // customerId가 있을 때만 활성화
        onError: (error) => {
            console.error("좋아요한 크리에이터를 불러오는 중 오류 발생:", error);
        },
    });

    // 제작자 상품으로 이동
    const moveToProductList = (creatorId?: string) => {
        if (creatorId) {
            navigate(`/product/list/${creatorId}`);
        }
    };

    // 언팔로우 후 새로고침
    const handleAfterUnfollow = () => {
        refetch(); // 언팔로우 후 데이터를 새로 가져오기
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading ? (
                <div className="flex items-center justify-center h-96">
                    <p className="text-gray-500 text-lg">로딩 중...</p>
                </div>
            ) : creators.length > 0 ? (
                <>
                    <h2 className="text-xl font-bold mb-6">제작자 {creators.length}</h2>
                    {/* 반응형 그리드: 웹 4개, 앱 2개 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {creators.map((creator) => (
                            <div
                                key={creator.creatorId}
                                className="rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 p-5 shadow-md flex flex-col items-center w-full"
                            >
                                {/* 프로필 이미지 */}
                                <img
                                    src={creator.profileImg || profileImg}
                                    alt={creator.name}
                                    className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-white shadow-md"
                                />

                                {/* 이름 */}
                                <h3 className="text-base font-semibold">{creator.name}</h3>

                                {/* FollowButton 컴포넌트 */}
                                <div className="mt-4">
                                    <FollowButton
                                        creatorId={creator.creatorId}
                                        currentStatus={true} // 현재 팔로우 상태
                                        customerId={customerId || ""}
                                        onUnfollow={handleAfterUnfollow} // 언팔로우 후 새로고침
                                    />
                                </div>

                                <button
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                    onClick={() => moveToProductList(creator.creatorId)}
                                >
                                    상품 보기
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-96">
                    <p className="text-lg font-bold mb-2">좋아요한 크리에이터가 없어요.</p>
                    <p className="text-gray-600 mb-6">내 취향의 크리에이터를 찾아보세요.</p>
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={() => navigate(`/creator/list/all`)}
                    >
                        크리에이터 찾아보기
                    </button>
                </div>
            )}
        </div>
    );
}

export default WishlistCreatorComponent;
