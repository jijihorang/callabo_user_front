import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

import img1 from "../../../../public/slider/special/limited1.jpg";
import img2 from "../../../../public/slider/special/limited2.jpeg";
import img3 from "../../../../public/slider/special/limited3.jpeg";

const MarppleShopSlider = () => {
    const slides = [
        {
            id: 1,
            title: "LOGOSHOP PRODUCT",
            description: "특별한 제품을 지금 만나보세요!",
            image: img1,
            overlayImage: img1, // 추가 이미지
        },
        {
            id: 2,
            title: "LOGOSHOP PRODUCT",
            description: "유니크한 디자인을 만나보세요!",
            image: img2,
            overlayImage: img2,
        },
        {
            id: 3,
            title: "LOGOSHOP PRODUCT",
            description: "오직 로고샵에서만!",
            image: img3,
            overlayImage: img3,
        },
    ];

    return (
        <div className="relative w-full bg-black">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                className="w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative w-full h-[400px] flex flex-col items-center bg-cover bg-center rounded-lg overflow-hidden"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            {/* 오버레이 */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>

                            {/* 텍스트 콘텐츠 */}
                            <div className="relative z-10 text-center text-white px-6 max-w-lg mt-10 md:mt-20 space-y-4">
                                <p className="text-sm">{slide.description}</p>
                                <h1 className="text-xl md:text-2xl font-bold">
                                    {slide.title}
                                </h1>
                            </div>

                            {/* 오버레이 이미지 */}
                            <div className="relative z-10 mt-6 md:mt-8">
                                <img
                                    src={slide.overlayImage}
                                    alt={slide.title}
                                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>

                            {/* 버튼 */}
                            <button className="relative z-10 mt-6 px-6 py-2 text-sm md:text-base bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition">
                                See More
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MarppleShopSlider;
