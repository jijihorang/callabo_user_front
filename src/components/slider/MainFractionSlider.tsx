import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay} from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

import img1 from "../../../public/slider/main/001.png";
import img2 from "../../../public/slider/main/002.png";
import img3 from "../../../public/slider/main/003.png";
import img4 from "../../../public/slider/main/004.png";
import img5 from "../../../public/slider/main/005.png";

function MainFractionSlider() {
    return (
        <div className="relative w-full">
            <Swiper
                modules={[Autoplay]}
                autoplay = {{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-[60vh] md:h-[50vh]" // 기본 모바일 높이, 데스크톱에서는 더 높게
            >
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        {/* 배경 이미지 */}
                        <img
                            src={img2}
                            alt="Slide Background"
                            className="w-full h-full object-cover"
                        />
                        {/* 텍스트 콘텐츠 */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent flex items-center px-6 md:px-16">
                            <div className="text-white space-y-4 max-w-lg">
                                <h3 className="text-sm md:text-lg uppercase">Logo Shop</h3>
                                <h1 className="text-2xl md:text-4xl font-bold leading-snug">
                                    마이멜로디 [산리오]
                                    <br/>
                                    생일 기념 한정 MD 오픈!
                                </h1>
                                <p className="text-sm md:text-base">
                                    [마이멜로디]의 생일 기념 한정 굿즈를 만나보세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img
                            src={img1}
                            alt="Slide Background"
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-6 md:px-16">
                            <div className="text-white space-y-4 max-w-lg">
                                <h3 className="text-sm md:text-lg uppercase">Logo Shop</h3>
                                <h1 className="text-2xl md:text-4xl font-bold leading-snug">
                                    마이멜로디 [산리오]
                                    <br/>
                                    새로운 이벤트!
                                </h1>
                                <p className="text-sm md:text-base">
                                    다양한 한정판 굿즈를 지금 확인해보세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img
                            src={img3}
                            alt="Slide Background"
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-6 md:px-16">
                            <div className="text-white space-y-4 max-w-lg">
                                <h3 className="text-sm md:text-lg uppercase">Logo Shop</h3>
                                <h1 className="text-2xl md:text-4xl font-bold leading-snug">
                                    마이멜로디 [산리오]
                                    <br/>
                                    한정판 공개!
                                </h1>
                                <p className="text-sm md:text-base">
                                    특별한 한정판 굿즈를 만나보세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-full">
                        {/* 배경 이미지 */}
                        <img
                            src={img4}
                            alt="Slide Background"
                            className="w-full h-full object-cover"
                        />
                        {/* 텍스트 콘텐츠 */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-6 md:px-16">
                            <div className="text-white space-y-4 max-w-lg">
                                <h3 className="text-sm md:text-lg uppercase">Logo Shop</h3>
                                <h1 className="text-2xl md:text-4xl font-bold leading-snug">
                                    뜨뜻한 겨울나기를 위한
                                    <br/>
                                    마플샵의 따끈따끈한 신상
                                </h1>
                                <p className="text-sm md:text-base">
                                    [마플샵]의 겨울 한정 굿즈를 만나보세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-full">
                        {/* 배경 이미지 */}
                        <img
                            src={img5}
                            alt="Slide Background"
                            className="w-full h-full object-cover"
                        />
                        {/* 텍스트 콘텐츠 */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-6 md:px-16">
                            <div className="text-white space-y-4 max-w-lg">
                                <h3 className="text-sm md:text-lg uppercase">Logo Shop</h3>
                                <h1 className="text-2xl md:text-4xl font-bold leading-snug">
                                    마이멜로디 [산리오]
                                    <br/>
                                    생일 기념 한정 MD 오픈!
                                </h1>
                                <p className="text-sm md:text-base">
                                    [마이멜로디]의 생일 기념 한정 굿즈를 만나보세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default MainFractionSlider;