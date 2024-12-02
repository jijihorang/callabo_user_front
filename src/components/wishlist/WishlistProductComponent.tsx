import { useNavigate } from "react-router-dom";
import mangnani from "../../assets/img/mangnani.png";
import keyring from "../../assets/img/roulette.png";
import tray from "../../assets/img/tray.png";
import likeIcon from "../../assets/icons/redheart.png";
import heart from "../../assets/icons/redheart.png";

function WishlistProductComponent() {
    const likedProducts = [
        {
            id: 1,
            img: mangnani,
            name: "맥주잔+차쥐뿔 병따개 SET",
            price: 21000,
        },
        {
            id: 2,
            img: keyring,
            name: "천재표 키링",
            price: 12000,
        },
        {
            id: 3,
            img: tray,
            name: "보이스 키링_알랑방구둥이",
            price: 17000,
        },
    ];

    const navigate = useNavigate();

    return (
        <div className="container mx-auto">
            {likedProducts.length > 0 ? ( // 조건부 렌더링 추가
                <>
                    <h2 className="text-xl font-bold mb-6">상품 {likedProducts.length}</h2>
                    <div className="grid grid-cols-6 gap-3">
                        {likedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border border-gray-200 rounded-lg p-8 flex flex-col items-center"
                            >
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-40 h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-sm font-bold mb-2">{product.name}</h3>
                                <div className="text-blue-600 font-bold mb-2">
                                    {product.price.toLocaleString()}원
                                </div>
                                <button className="flex items-center space-x-2 mt-3">
                                    <img src={likeIcon} alt="찜" className="w-5 h-5" />
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
