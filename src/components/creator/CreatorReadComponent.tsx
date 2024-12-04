import wheart from "../../assets/icons/whiteheart.png";
import cart2 from "../../assets/icons/cart.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/product/iproduct.ts";
import { ICreator } from "../../types/creator/icreator.ts";
import { getProductList } from "../../apis/product/productAPI";
import { getCreatorList } from "../../apis/creator/creatorAPI";

function CreatorReadComponent() {
    const { creatorId } = useParams(); // URL에서 creatorId 추출
    const [products, setProducts] = useState<IProduct[]>([]);
    const [creator, setCreator] = useState<ICreator | null>(null);

    // 데이터 로드
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (creatorId) {
                    const data = await getProductList(creatorId); // creatorId로 필터링된 상품 목록 가져오기
                    setProducts(data);
                }
            } catch (error) {
                console.error("상품 데이터를 가져오는 중 에러 발생:", error);
            }
        };

        const fetchCreatorInfo = async () => {
            try {
                const data = await getCreatorList();
                const selectedCreator = data.find((c: ICreator) => c.creatorId === creatorId); // creatorId로 필터링
                setCreator(selectedCreator || null);
                if (!selectedCreator) {
                    console.warn(`제작자 ${creatorId}를 찾을 수 없습니다.`);
                }
            } catch (error) {
                console.error("제작자 정보를 가져오는 중 에러 발생:", error);
            }
        };

        fetchCreatorInfo();
        fetchProducts();
    }, [creatorId]); // creatorId 변경 시 재호출

    // 데이터 로딩 중 상태
    if (!creator) {
        return <p className="text-center">제작자 정보를 불러오는 중입니다...</p>;
    }

    return (
        <div className="container mx-auto mb-20 px-4">
            {/* 배너 */}
            <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden mb-5">
                <img
                    src={creator.backgroundImg}
                    alt="배너 이미지"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 제작자 정보 */}
            <div className="text-center mb-8">
                <div
                    className="relative inline-block w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white shadow-md -mt-12"
                >
                    <img
                        src={creator.logoImg}
                        alt="제작자 프로필"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mt-4">
                    {creator.creatorName || "제작자 이름 없음"}
                </h2>
                <button
                    className="flex items-center mx-auto mt-4 bg-gray-100 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
                >
                    <img src={wheart} alt="찜" className="w-5 h-5 text-blue-500" />
                    <span className="ml-2 text-gray-700 font-medium text-sm">
                        1,600
                    </span>
                </button>
            </div>

            {/* 상품 리스트 */}
            <div className="px-4">
                <h2 className="text-[15px] mb-1">당신의 취향을 저격할</h2>
                <h1 className="text-[30px] font-bold mb-5">PRODUCTS</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={`${product.productNo}-${index}`}
                            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <Link to={`/creator/detail/${product.productNo}`}>
                            {/* 상품 이미지 */}
                                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                                    <img
                                        src={
                                            product.productImages && product.productImages[0]
                                                ? product.productImages[0].productImageUrl
                                                : "https://via.placeholder.com/150"
                                        }
                                        alt={product.productName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* 상품 정보 */}
                                <div className="p-4">
                                    <h4 className="text-[14px] font-bold text-gray-800 truncate">
                                        {product.productName}
                                    </h4>
                                    <p className="text-gray-600 text-sm mt-2">
                                        {product.productPrice.toLocaleString()}원
                                    </p>
                                </div>
                                {/* 하트 아이콘 */}
                                <button
                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                                    onClick={() =>
                                        console.log(`${product.productName} 좋아요 클릭`)
                                    }
                                >
                                    <img src={wheart} alt="찜" className="w-4 h-4" />
                                </button>
                                {/* 장바구니 아이콘 */}
                                <button
                                    className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow border hover:bg-gray-100"
                                    onClick={() =>
                                        console.log(`${product.productName} 장바구니에 추가됨`)
                                    }
                                >
                                    <img src={cart2} alt="장바구니" className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CreatorReadComponent;
