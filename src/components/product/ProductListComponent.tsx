import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProductList} from "../../types/product/iproduct.ts";
import { ICreator } from "../../types/creator/icreator.ts";
import { getProductList } from "../../apis/product/productAPI.ts";
import { getCreatorList } from "../../apis/creator/creatorAPI.ts";

import wheart from "../../assets/icons/whiteheart.png";
import cart2 from "../../assets/icons/cart.png";
import useAuthStore from "../../stores/customer/AuthStore.ts";
import useCartStore from "../../stores/cart/cartStore.ts";
import LikeButton from "./ProductLikeButton.tsx";

function ProductListComponent() {
    const { creatorId } = useParams(); // URL에서 creatorId 추출
    const { customer } = useAuthStore();
    const { addToCart } = useCartStore(); // Zustand 상태 가져오기
    const [products, setProducts] = useState<IProductList[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<IProductList[]>([]); // 현재 화면에 보이는 상품들
    const [creator, setCreator] = useState<ICreator | null>(null);
    const [expanded, setExpanded] = useState(false); // "See More" / "Close" 상태
    const productsPerPage = 8; // 한 페이지에 표시할 상품 수

    // 데이터 로드
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (creatorId) {
                    const data = await getProductList(creatorId); // creatorId로 필터링된 상품 목록 가져오기
                    setProducts(data);
                    setVisibleProducts(data.slice(0, productsPerPage)); // 첫 페이지의 상품만 표시
                }
            } catch (error) {
                console.error("상품 데이터를 가져오는 중 에러 발생:", error);
            }
        };

        const fetchCreatorInfo = async () => {
            try {
                if (customer?.customerId) {
                    const data = await getCreatorList(customer.customerId); // customerId로 제작자 목록 가져오기
                    const selectedCreator = data.find((c: ICreator) => c.creatorId === creatorId); // creatorId로 필터링
                    setCreator(selectedCreator || null);
                } else {
                    console.error("customerId가 없습니다.");
                }
            } catch (error) {
                console.error("제작자 정보를 가져오는 중 에러 발생:", error);
            }
        };

        fetchCreatorInfo();
        fetchProducts();
    }, [creatorId]); // creatorId 변경 시 재호출

    const handleLikeStatusChange = (productId: number, newStatus: boolean) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.productNo === productId ? { ...product, likeStatus: newStatus } : product
            )
        );
        setVisibleProducts((prevVisibleProducts) =>
            prevVisibleProducts.map((product) =>
                product.productNo === productId ? { ...product, likeStatus: newStatus } : product
            )
        );
    };


    // "See More" / "Close" 버튼 클릭 핸들러
    const toggleProductVisibility = () => {
        if (expanded) {
            setVisibleProducts(products.slice(0, productsPerPage)); // 처음 페이지로 되돌리기
        } else {
            setVisibleProducts(products); // 모든 상품 표시
        }
        setExpanded(!expanded); // 상태 토글
    };

    // 데이터 로딩 중 상태
    if (!creator) {
        return <p className="text-center">제작자 정보를 불러오는 중입니다...</p>;
    }

    return (
        <div className="container mx-auto mb-20 px-5">
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
                    <span className="ml-2 text-gray-700 font-medium text-sm">1,600</span>
                </button>
            </div>

            {/* 상품 리스트 */}
            <div className="px-4">
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-[15px]">당신의 취향을 저격할</h2>
                        <h1 className="text-[30px] font-bold">PRODUCTS</h1>
                    </div>

                    {/* "See More" / "Close" 버튼 */}
                    {products.length > productsPerPage && (
                        <button
                            className="px-6 py-2 text-gray-500 border border-gray-400 rounded-lg transition"
                            onClick={toggleProductVisibility}
                        >
                            {expanded ? "Close" : "See More"}
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleProducts.map((product, index) => (
                        <div
                            key={`${product.productNo}-${index}`}
                            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <Link to={`/product/detail/${product.productNo}`}>
                                {/* 상품 이미지 */}
                                {/* 상품 이미지 */}
                                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                                    <img
                                        src={
                                            product.productImageUrl // productImageUrl 필드를 사용
                                                ? product.productImageUrl // 이미지 URL이 있을 경우 사용
                                                : "https://via.placeholder.com/150" // 기본 이미지 URL
                                        }
                                        alt={product.productName} // 상품 이름을 alt 속성으로 설정
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
                            </Link>
                            {/* 하트 아이콘 */}

                            <LikeButton
                                customerId={customer?.customerId || ""}
                                productId={product.productNo}
                                currentStatus={product.likeStatus || false}
                                onToggle={(newStatus) => handleLikeStatusChange(product.productNo, newStatus)}
                            />

                            {/* 장바구니 아이콘 */}
                            <button
                                className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow border hover:bg-gray-100"
                                onClick={() =>
                                    addToCart({
                                        id: product.productNo,
                                        img: product.productImages?.[0]?.productImageUrl || "",
                                        name: product.productName,
                                        price: product.productPrice,
                                        category: product.categoryName || "기타",
                                        quantity: 1,
                                    })
                                }
                            >
                                <img src={cart2} alt="장바구니" className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductListComponent;
