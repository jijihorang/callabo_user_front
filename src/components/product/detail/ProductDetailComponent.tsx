import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageSlider from "../../slider/ProductImageSlider.tsx";
import ProductInfoComponent from "./ProductInfoComponent.tsx";
import ProductDescriptionComponent from "./ProductDescriptionComponent.tsx";
import ProductFAQComponent from "./ProductFAQComponent.tsx";
import ProductReviewComponent from "./ProductReviewComponent.tsx";

import { getProductRead } from "../../../apis/product/productAPI.ts";
import { IProduct } from "../../../types/product/iproduct.ts";

import heart from "../../../assets/icons/heart.png";
import close from "../../../assets/icons/close.png";
function ProductDetailComponent() {
    const [activeTab, setActiveTab] = useState("description"); // 탭 상태 관리
    const [showPurchasePopup, setShowPurchasePopup] = useState(false); // 구매 팝업 상태
    const [isMobile, setIsMobile] = useState(false); // 화면 크기 상태
    const [product, setProduct] = useState<IProduct | null>(null); // 상품 데이터 상태
    const { creatorId, productNo } = useParams<{ creatorId: string, productNo: string }>();
    // 화면 크기 체크
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 768px 이하를 모바일로 간주
        };
        handleResize(); // 초기 체크
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 상품 데이터 가져오기
    useEffect(() => {
        if (creatorId && productNo) {
            const fetchProduct = async () => {
                try {
                    const productData = await getProductRead(creatorId, parseInt(productNo, 10));
                    setProduct(productData);
                } catch (error) {
                    console.error("Failed to fetch product data:", error);
                }
            };
            fetchProduct();
        }
    }, [productNo]);
    const handlePurchaseClick = () => {
        setShowPurchasePopup(true);
    };
    const handleClosePopup = () => {
        setShowPurchasePopup(false);
    };

    return (
        <div className="container mx-auto mt-5 pb-5">
            {/* 상품 이미지 및 정보 섹션 */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
                <div className="flex-1 flex justify-center">
                    {product?.productImages ? (
                        <ProductImageSlider productImages={product.productImages}/>
                    ) : (
                        <p className="text-center text-gray-500">이미지를 불러오는 중입니다...</p>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-center ml-4">
                    {creatorId && productNo ? (
                        <ProductInfoComponent creatorId={creatorId} productNo={parseInt(productNo, 10)}/>
                    ) : (
                        <p className="text-center text-gray-500">상품 번호가 유효하지 않습니다.</p>
                    )}
                </div>
            </div>
            {/* 탭 메뉴 */}
            <div className="mt-8 border-b">
                <div className="flex justify-center space-x-8">
                    {["description", "faq", "review"].map((tab) => (
                        <button
                            key={tab}
                            className={`py-2 ${
                                activeTab === tab
                                    ? "text-blue-600 font-bold border-b-2 border-blue-600 text-lg"
                                    : "text-gray-400 text-lg"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "description" ? "상품 상세" : tab === "faq" ? "F&Q" : "리뷰"}
                        </button>
                    ))}
                </div>
            </div>

            {/* 탭 내용 */}
            <div className="mt-8 mb-20 m-5">
                {activeTab === "description" && product && (
                    <ProductDescriptionComponent productDescription={product.productDescription}/>
                )}
                {activeTab === "faq" && <ProductFAQComponent/>}
                {activeTab === "review" && product && (
                    <ProductReviewComponent reviews={product.reviews} productNo={product.productNo}/>
                )}
            </div>

            {/* 하단 고정 구매 영역 (모바일에서만 표시) */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 w-full bg-white flex justify-between items-center px-4 py-3 z-50">
                    <button
                        className="text-gray-500 font-bold flex items-center"
                        onClick={() => console.log("찜하기 클릭됨")}
                    >
                        <img src={heart} alt="찜하기" className="w-5 h-5 mr-2"/>
                    </button>
                    <div className="flex gap-4">
                        <button
                            className="bg-blue-600 text-white px-10 py-2 rounded-lg hover:bg-blue-700"
                            onClick={handlePurchaseClick}
                        >
                            구매하기
                        </button>
                    </div>
                </div>
            )}
            {/* 구매 팝업 (모바일에서만 표시) */}
            {isMobile && showPurchasePopup && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 px-4 py-6 rounded-t-2xl">
                        <div className="flex justify-end items-center mb-4">
                            <button onClick={handleClosePopup} className="text-gray-500">
                                <img src={close} alt="닫기" className="w-5 h-5"/>
                            </button>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-700">수량</span>
                                <div className="flex items-center gap-2">
                                    <button className="px-2 py-1 font-bold text-lg">−</button>
                                    <span className="text-lg font-semibold text-gray-800">1</span>
                                    <button className="px-2 py-1 font-bold text-lg">+</button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">총 상품 금액</span>
                                <span className="text-2xl font-bold">{product?.productPrice}원</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="flex-1 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                onClick={() => console.log("장바구니 클릭됨")}
                            >
                                장바구니
                            </button>
                            <button
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                onClick={() => console.log("구매하기")}
                            >
                                바로 구매하기
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductDetailComponent;