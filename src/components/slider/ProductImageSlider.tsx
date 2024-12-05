import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/pagination";

interface ProductImage {
    productImageNo: number;
    productImageUrl: string;
    productImageOrd: number;
}

function ProductImageSlider({ productImages }: { productImages: ProductImage[] }) {
    // 슬라이드가 충분하지 않을 경우 복제
    const slides = productImages.length >= 3 ? productImages : [...productImages, ...productImages];

    return (
        <div className="w-full max-w-[500px] mx-auto">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={slides.length > 3} // 슬라이드가 충분할 경우에만 loop 활성화
                spaceBetween={10}
                className="relative w-full h-[400px]"
            >
                {slides.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex justify-center items-center"
                    >
                        <img
                            src={image.productImageUrl}
                            alt={`Product Image ${image.productImageNo}`}
                            className="w-auto h-full object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ProductImageSlider;

