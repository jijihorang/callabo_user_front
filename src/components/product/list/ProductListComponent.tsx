import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/pagination";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import cart2 from "../../../../public/icons/cart.png";
import useAuthStore from "../../../stores/customer/AuthStore.ts";
import useCartStore from "../../../stores/cart/cartStore.ts";
import { IProduct, IProductList } from "../../../types/product/iproduct.ts";
import { ICreator } from "../../../types/creator/icreator.ts";
import { getProductList } from "../../../apis/product/productAPI.ts";
import { getCreatorList } from "../../../apis/creator/creatorAPI.ts";

import { SweetAlertOptions } from "sweetalert2";
import AlertComponent from "../../common/AlertComponent.tsx";

import FollowButton from "../../creator/FollowButton.tsx";
import DropdownComponent from "../../common/DropdownComponent.tsx";

import prev from "../../../../public/icons/prev.png"
import next from "../../../../public/icons/next.png"

function ProductListComponent() {
    const { creatorId } = useParams(); // URL에서 creatorId 추출
    const { customer } = useAuthStore();
    const { addToCart } = useCartStore(); // Zustand 상태 가져오기
    const [products, setProducts] = useState<IProductList[]>([]);
    const [creator, setCreator] = useState<ICreator | null>(null);
    const [alertOptions, setAlertOptions] = useState<SweetAlertOptions | null>(null);

    const [sortOption, setSortOption] = useState("최신순"); // 정렬 옵션 상태

    // 정렬 함수
    const sortProducts = (option: string) => {
        const sortedProducts = [...products];
        if (option === "최신순") {
            sortedProducts.sort((a, b) => b.productNo - a.productNo); // 최신순 로직
        } else if (option === "인기순") {
            sortedProducts.sort((a, b) => a.productNo - b.productNo); // 인기순 로직
        }
        setProducts(sortedProducts);
    };

    // Dropdown 변경 시 정렬 적용
    const handleDropdownChange = (option: string) => {
        setSortOption(option);
        sortProducts(option);
    };


    // 데이터 로드
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (creatorId) {
                    const data = await getProductList(creatorId);

                    // 상품 번호 기준으로 중복 제거
                    const uniqueProducts = data.filter(
                        (product, index, self) =>
                            self.findIndex((p) => p.productNo === product.productNo) === index
                    );

                    setProducts(uniqueProducts);
                }
            } catch (error) {
                console.error("상품 데이터를 가져오는 중 에러 발생:", error);
            }
        };

        const fetchCreatorInfo = async () => {
            try {
                if (customer?.customerId) {
                    const data = await getCreatorList(customer.customerId);
                    const selectedCreator = data.find((c: ICreator) => c.creatorId === creatorId);
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
    }, [creatorId]);

    // 장바구니에 상품 추가
    const handleAddToCart = (product: IProductList) => {
        const productData: IProduct = {
            ...product,
            productDescription: product.productDescription || "",
            productImages: product.productImages || [],
        };

        const productCreatorId = creatorId || "unknown";

        addToCart({
            id: productData.productNo,
            img: product.productImageUrl || "https://via.placeholder.com/150",
            name: productData.productName,
            price: productData.productPrice,
            category: productData.categoryName || "기타",
            quantity: 1,
            creatorId: productCreatorId,
        });

        setAlertOptions({
            title: "장바구니 추가",
            text: `${productData.productName} 1개가 장바구니에 추가되었습니다.`,
            icon: "success",
            confirmButtonText: "확인",
        });
    };

    if (!creator) {
        return <p className="text-center">제작자 정보를 불러오는 중입니다...</p>;
    }

    return (
        <div className="container mx-auto mb-20 px-5">

            {alertOptions && (
                <AlertComponent
                    options={alertOptions}
                    onClose={() => setAlertOptions(null)}
                />
            )}

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
                    className="relative inline-block w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white shadow-md -mt-12">
                    <img
                        src={creator.logoImg}
                        alt="제작자 프로필"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mt-4">
                    {creator.creatorName || "제작자 이름 없음"}
                </h2>
                <div
                    className="flex items-center justify-center transition-shadow max-w-max mx-auto mt-4"
                >
                    <FollowButton
                        creatorId={creator?.creatorId || ""}
                        customerId={customer?.customerId || ""}
                    />
                </div>
            </div>

            {/* 상품 리스트 */}
            <div className="px-6 relative">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5">
                    <div className="mb-3 sm:mb-0">
                        <h2 className="text-[15px]">당신의 취향을 저격할</h2>
                        <h1 className="text-[30px] font-bold">PRODUCTS</h1>
                    </div>

                    {/* Dropdown Component */}
                    <div className="sm:ml-4">
                        <DropdownComponent
                            selectedOption={sortOption}
                            setSelectedOption={handleDropdownChange}
                        />
                    </div>
                </div>

                {/* 상품 리스트를 Swiper로 구현 */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={{
                        prevEl: ".custom-prev",
                        nextEl: ".custom-next",
                    }}
                    pagination={{
                        type: "fraction",
                        clickable: true, // Pagination 클릭 가능 설정
                        el: ".custom-pagination",
                    }}
                    autoplay={{
                        delay: 5000, // 3초마다 자동으로 넘어감
                        disableOnInteraction: false, // 사용자가 스와이프해도 autoplay 유지
                    }}
                    breakpoints={{
                        320: {slidesPerView: 2, spaceBetween: 10},
                        768: {slidesPerView: 3, spaceBetween: 15},
                        1024: {slidesPerView: 4, spaceBetween: 20},
                    }}
                    className="relative"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.productNo}>
                            <div className="relative bg-white rounded-lg hover:shadow-lg transition-all p-4">
                                <Link to={`/product/${creatorId}/detail/${product.productNo}`}>
                                    <div className="w-full h-50 overflow-hidden rounded-t-lg">
                                        <img
                                            src={
                                                product.productImageUrl
                                                    ? product.productImageUrl
                                                    : "https://via.placeholder.com/150"
                                            }
                                            alt={product.productName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-[14px] font-bold text-gray-800 truncate">
                                            {product.productName}
                                        </h4>
                                        <p className="text-gray-600 text-sm mt-2">
                                            {product.productPrice.toLocaleString()}원
                                        </p>
                                    </div>
                                </Link>
                                <button
                                    className="absolute bottom-2 right-4 p-1 bg-white rounded-full shadow border hover:bg-gray-100"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    <img src={cart2} alt="장바구니" className="w-5 h-5"/>
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div
                    className="custom-pagination absolute bottom-[-30px] left-0 right-0 flex justify-center gap-1 z-10">
                </div>

                <div
                    className="custom-prev absolute top-[60%] left-[-24px] transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 cursor-pointer"
                >
                    <img src={prev} alt="이전" className="w-4 h-4"/>
                </div>
                <div
                    className="custom-next absolute top-[60%] right-[-24px] transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 cursor-pointer"
                >
                    <img src={next} alt="다음" className="w-4 h-4"/>
                </div>

            </div>
        </div>
    );
}

export default ProductListComponent;
