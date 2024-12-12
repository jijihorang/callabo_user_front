import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { IProductRanking } from "../../../types/product/iproduct.ts";
import { getTopOrderedProducts } from "../../../apis/product/productAPI.ts";

const RankingProductComponent = () => {
    const [products, setProducts] = useState<IProductRanking[]>([]); // API 데이터 저장
    const navigate = useNavigate(); // 디테일 페이지 이동을 위한 훅

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getTopOrderedProducts(); // API 호출
                setProducts(data); // 데이터 설정
            } catch (error) {
                console.error("상품 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchProducts();
    }, []);

    // 상품 클릭 시 디테일 페이지 이동
    const handleProductClick = (creatorId: string, productNo: number) => {
        navigate(`/product/${creatorId}/detail/${productNo}`); // 해당 상품의 디테일 페이지로 이동
    };

    return (
        <div className="container mx-auto p-4 mb-20">
            <h3 className="text-sm text-gray-500">인기 상품 랭킹</h3>
            <h2 className="text-2xl font-bold mb-4">WEEKLY BEST</h2>

            {/* 데스크톱: 일반 그리드 */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="border rounded-lg shadow hover:shadow-lg p-4 relative cursor-pointer"
                        onClick={() => handleProductClick(product.creatorId, product.productNo)}
                    >
                        {/* 상품 이미지 */}
                        <img
                            src={product.productImageUrl || "/placeholder.jpg"} // 이미지 URL 또는 기본 이미지
                            alt={product.prodcutName}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="mt-2">
                            {/* 상품 이름 */}
                            <h3 className="text-sm font-medium truncate">{product.prodcutName}</h3>
                            {/* 상품 설명 */}
                            <p className="text-xs text-gray-500 truncate">{product.productDescription}</p>
                            {/* 상품 가격 */}
                            <p className="text-lg font-semibold mt-1">
                                {product.productPrice.toLocaleString()}원
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 모바일: 스와이프 그리드 */}
            <Swiper
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                pagination={{
                    type: "fraction",
                    clickable: true, // Pagination 클릭 가능 설정
                    el: ".custom-pagination",
                }}
                className="md:hidden p-3"
            >
                {Array.from({length: Math.ceil(products.length / 4)}).map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className="grid grid-cols-2 gap-4">
                            {products.slice(index * 4, index * 4 + 4).map((product) => (
                                <div
                                    key={product.productNo}
                                    className="border rounded-lg shadow hover:shadow-lg p-4 relative cursor-pointer"
                                    onClick={() => handleProductClick(product.creatorId, product.productNo)}
                                >
                                    {/* 상품 이미지 */}
                                    <img
                                        src={product.productImageUrl || "/placeholder.jpg"} // 이미지 URL 또는 기본 이미지
                                        alt={product.prodcutName}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                    <div className="mt-2">
                                        {/* 상품 이름 */}
                                        <h3 className="text-sm font-medium truncate">{product.prodcutName}</h3>
                                        {/* 상품 설명 */}
                                        <p className="text-xs text-gray-500 truncate">{product.productDescription}</p>
                                        {/* 상품 가격 */}
                                        <p className="text-lg font-semibold mt-1">
                                            {product.productPrice.toLocaleString()}원
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
                <div
                    className="custom-pagination relative bottom-[-10px] left-0 right-0 flex justify-center gap-1 z-10">
                </div>
            </Swiper>
        </div>
    );
};

export default RankingProductComponent;