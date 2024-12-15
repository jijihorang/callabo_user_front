import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

import img1 from "/slider/main/001.png";
import img2 from "/slider/main/002.png";
import img3 from "/slider/main/003.png";
import img4 from "/slider/main/004.png";
import img5 from "/slider/main/005.png";


function MainFractionSlider() {
    return (
        <div className="relative w-full overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                centeredSlides={true}
                className="w-full gap-0.5"
            >
                {/* 슬라이드 1 */}
                <SwiperSlide>
                    <div className="relative w-full">
                        <img
                            src={img2}
                            alt="Slide Background"
                            className="w-full object-cover md:h-[500px] h-[177.11px]" // 데스크톱과 모바일 높이 구분
                        />
                    </div>
                </SwiperSlide>

                {/* 슬라이드 2 */}
                <SwiperSlide>
                    <div className="relative w-full">
                        <img
                            src={img1}
                            alt="Slide Background"
                            className="w-full object-cover md:h-[500px] h-[177.11px]" // 데스크톱과 모바일 높이 구분
                        />
                    </div>
                </SwiperSlide>

                {/* 슬라이드 3 */}
                <SwiperSlide>
                    <div className="relative w-full">
                        <img
                            src={img3}
                            alt="Slide Background"
                            className="w-full object-cover md:h-[500px] h-[177.11px]" // 데스크톱과 모바일 높이 구분
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full">
                        <img
                            src={img4}
                            alt="Slide Background"
                            className="w-full object-cover md:h-[500px] h-[177.11px]" // 데스크톱과 모바일 높이 구분
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full">
                        <img
                            src={img5}
                            alt="Slide Background"
                            className="w-full object-cover md:h-[500px] h-[177.11px]" // 데스크톱과 모바일 높이 구분
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default MainFractionSlider;
