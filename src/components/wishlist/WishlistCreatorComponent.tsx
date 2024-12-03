import profileImg from "../../assets/img/pro1.png";
import product1 from "../../assets/img/prod1.png";
import product2 from "../../assets/img/prod1.png";
import product3 from "../../assets/img/prod1.png";
import heartIcon from "../../assets/icons/redheart.png";
import heart from "../../assets/icons/redheart.png";
import { useNavigate } from "react-router-dom";

function WishlistCreatorComponent() {
    const creators = [
        {
            creatorId: "1",
            profileImg: profileImg,
            name: "차린건쥐뿔도없지만",
            likes: 1664,
            products: [product1, product2, product3],
        },
        {
            creatorId: "2",
            profileImg: profileImg,
            name: "차린건쥐뿔도없지만",
            likes: 1664,
            products: [product1, product2, product3],
        },
        {
            creatorId: "3",
            profileImg: profileImg,
            name: "차린건쥐뿔도없지만",
            likes: 1664,
            products: [product1, product2, product3],
        },
        {
            creatorId: "4",
            profileImg: profileImg,
            name: "차린건쥐뿔도없지만",
            likes: 1664,
            products: [product1, product2, product3],
        },
    ];

    const navigate = useNavigate();

    // 제작자 상품으로 이동
    const moveToProductList = (creatorId?: string) => {
        if (creatorId) {
            navigate(`/creator/read/${creatorId}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {creators.length > 0 ? (
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
                                    src={creator.profileImg}
                                    alt={creator.name}
                                    className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-white shadow-md"
                                />

                                {/* 이름 */}
                                <h3 className="text-base font-semibold">{creator.name}</h3>

                                {/* 찜 수 */}
                                <div className="flex items-center mt-2">
                                    <img
                                        src={heartIcon}
                                        alt="좋아요"
                                        className="w-5 h-5 mr-1"
                                    />
                                    <span className="text-blue-600 text-base font-medium">
                                        {creator.likes.toLocaleString()}
                                    </span>
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
                    <img
                        src={heart}
                        alt="좋아요 아이콘"
                        className="w-20 h-20 mb-6"
                    />
                    <p className="text-lg font-bold mb-2">
                        좋아요한 크리에이터가 없어요.
                    </p>
                    <p className="text-gray-600 mb-6">
                        내 취향의 크리에이터를 찾아보세요.
                    </p>
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={() => navigate(`/creator/list/all`)}>
                        크리에이터 찾아보기
                    </button>
                </div>
            )}
        </div>
    );
}

export default WishlistCreatorComponent;
