import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

import img01 from "../../../assets/slider/special/limited1.jpg";
import img02 from "../../../assets/slider/special/limited2.jpeg";
import img03 from "../../../assets/slider/special/limited3.jpeg";
import img04 from "../../../assets/slider/special/limited5.jpg";
import img05 from "../../../assets/slider/special/img12.jpg";
import img06 from "../../../assets/slider/special/img13.jpg";
import img07 from "../../../assets/slider/special/img14.jpg";
import img08 from "../../../assets/slider/special/img15.jpg";


const SpecialOfferComponent = () => {
    const products = [
        { id: 1, title: "부산 텀블러", price: "7,900원", imageUrl: img01 },
        { id: 2, title: "부산광역시 텀블러", price: "7,900원", imageUrl: img02 },
        { id: 3, title: "부산 특별한 술", price: "9,900원", imageUrl: img03 },
        { id: 4, title: "자갈치 미피", price: "8,900원", imageUrl: img04 },
        { id: 5, title: "자갈치 미피", price: "8,900원", imageUrl: img05 },
        { id: 6, title: "자갈치 미피", price: "8,900원", imageUrl: img06 },
        { id: 7, title: "자갈치 미피", price: "8,900원", imageUrl: img07 },
        { id: 8, title: "자갈치 미피", price: "8,900원", imageUrl: img08 },
    ];

    return (
        <div className="inset-0 bg-gray-300 bg-opacity-70">
            <div className="container mx-auto p-20">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    centeredSlides={true} // 가운데 정렬
                    spaceBetween={20} // 슬라이드 간 간격
                    slidesPerView={1.5} // 기본 한 번에 1.5개 표시
                    loop={true} // 무한 반복
                    breakpoints={{
                        640: {slidesPerView: 2, spaceBetween: 30},
                        1024: {slidesPerView: 3, spaceBetween: 40},
                    }}
                    onSlideChangeTransitionStart={(swiper) => {
                        // 각 슬라이드의 크기 조정
                        swiper.slides.forEach((slide, index) => {
                            if (index === swiper.activeIndex) {
                                slide.style.transform = "scale(1)"; // 중앙 슬라이드 확대
                                slide.style.opacity = "1"; // 중앙 슬라이드 완전 표시
                            } else {
                                slide.style.transform = "scale(0.8)"; // 양쪽 슬라이드 축소
                                slide.style.opacity = "0.5"; // 양쪽 슬라이드 흐리게
                            }
                        });
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className="flex justify-center">
                            <div
                                className="bg-white rounded-lg shadow-lg overflow-hidden p-5 transform transition-transform duration-500">
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="w-full h-65 object-cover rounded-md mb-4"
                                />
                                <div className="text-center">
                                    <h4 className="text-sm font-semibold">{product.title}</h4>
                                    <p className="text-lg font-bold mt-2">{product.price}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SpecialOfferComponent;
