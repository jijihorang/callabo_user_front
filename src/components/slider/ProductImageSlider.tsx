import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/pagination";

import product1 from "../../assets/img/prod1.png";
import product2 from "../../assets/img/prod2.png";
import product3 from "../../assets/img/prod1.png";
import product4 from "../../assets/img/prod2.png";


function ProductImageSlider() {
    const productImages = [product1, product2, product3, product4];

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-[800px]" // 슬라이더 높이를 키움
            >
                {productImages.map((image, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-auto h-full object-contain" // 이미지가 슬라이더 영역에 맞춰 확대
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ProductImageSlider;
