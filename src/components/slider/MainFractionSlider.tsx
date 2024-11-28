import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

import img1 from "../../assets/img/img3.webp";
import img2 from "../../assets/img/img4.webp";
import img3 from "../../assets/img/img5.webp";

function MainFractionSlider() {
    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                loop={true}
                className="w-full h-[500px] md:h-[600px]" // 기본 모바일 높이, 데스크톱에서는 더 높게
            >
                {/* 슬라이드 1 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        {/* 배경 이미지 */}
                        <img
                            src={img1}
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
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg text-sm md:text-base">
                                    산리오 굿즈 샵 바로가기 →
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 슬라이드 2 */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img
                            src={img2}
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
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg text-sm md:text-base">
                                    이벤트 참여하기 →
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 슬라이드 3 */}
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
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg text-sm md:text-base">
                                    자세히 보기 →
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default MainFractionSlider;