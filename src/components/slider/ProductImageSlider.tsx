import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/pagination";

import product1 from "../../assets/img/prod1.png";
import product2 from "../../assets/img/prod1.png";
import product3 from "../../assets/img/prod1.png";

function ProductImageSlider() {
    const productImages = [product1, product2, product3];

    return (
        <div className="w-full max-w-[500px] mx-auto">
            <Swiper
                modules={[Navigation, Pagination]} // 필요한 모듈 추가
                navigation
                pagination={{clickable: true}} // Pagination 활성화
                loop={true}
                spaceBetween={10} // 슬라이드 간격
                className="relative w-full h-[400px]" // 슬라이더 크기 설정
            >
                {productImages.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex justify-center items-center"
                    >
                        <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-auto h-full object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ProductImageSlider;
