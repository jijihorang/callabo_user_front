import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams import 추가
import CreatorReviewReadComponent from "./CreatorReviewReadComponent";
import { IReview } from "../../../types/review/ireview.ts";
import { getReviewList } from "../../../apis/review/reviewAPI.ts";
import star1 from "../../../assets/icons/star.png";
import noStar1 from "../../../assets/icons/gstar.png";

import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination, Autoplay, Navigation} from "swiper/modules";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css/pagination";

import prev2 from "../../../assets/icons/prev.png"
import next2 from "../../../assets/icons/next.png"

function CreatorReviews() {
    const { creatorId } = useParams<{ creatorId: string }>(); // URL에서 creatorId 추출
    const [allReviews, setAllReviews] = useState<IReview[]>([]); // 모든 리뷰 데이터
    const [selectedReview, setSelectedReview] = useState<IReview | null>(null); // 선택된 리뷰 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    // API 호출
    useEffect(() => {
        const fetchReviews = async () => {
            if (!creatorId) {
                console.error("creatorId가 없습니다.");
                return;
            }
            try {
                const response = await getReviewList(creatorId); // creatorId로 리뷰 데이터 가져오기
                setAllReviews(response); // 전체 리뷰 데이터 저장
            } catch (error) {
                console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchReviews();
    }, [creatorId]);

    const openModal = (review: IReview) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <div className="container mx-auto mb-20 px-5">
            <div className="px-6 relative">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-3 sm:mb-0">
                        <h2 className="text-[15px]">솔직한</h2>
                        <h1 className="text-[30px] font-bold">REVIEW</h1>
                    </div>
                </div>
            </div>

            {/* 리뷰 리스트를 Swiper로 구현 */}
            <div className="relative">
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation={{
                        prevEl: ".swiper-button-prev2",
                        nextEl: ".swiper-button-next2",
                    }}
                    pagination={{
                        type: "fraction",
                        clickable: true,
                        el: ".custom-pagination2",
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
                    {allReviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="bg-white p-4 cursor-pointer"
                                onClick={() => openModal(review)} // 클릭 시 모달 열기
                            >
                                <img
                                    src={
                                        review.reviewImages && review.reviewImages.length > 0
                                            ? review.reviewImages[0].reviewImageUrl // 첫 번째 리뷰 이미지 URL 사용
                                            : "https://via.placeholder.com/150" // 기본 이미지 URL
                                    }
                                    alt={`리뷰 이미지 ${index + 1}`}
                                    className="w-full h-50 object-cover rounded-lg mb-4"
                                />
                                <div className="flex justify-between space-x-2 mb-2">
                                    {/* 별점 */}
                                    <div className="flex items-center space-x-1">
                                        {Array(5)
                                            .fill(0)
                                            .map((_, i) => (
                                                <img
                                                    key={i}
                                                    src={i < review.rating ? star1 : noStar1}
                                                    alt={i < review.rating ? "별점 채움" : "별점 비움"}
                                                    className="w-4 h-4"
                                                />
                                            ))}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-gray-400 text-sm md:text-base">{review.createdAt}</span>
                                </div>

                                {/* 제품 정보 */}
                                <div>
                                    <div
                                        className="text-sm font-semibold md:text-base truncate overflow-hidden text-ellipsis whitespace-nowrap"
                                    >
                                        {review.productName}
                                    </div>
                                    <div>{review.productPrice}</div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div
                    className="custom-pagination2 absolute bottom-[-30px] left-0 right-0 flex justify-center gap-0.5 z-10">
                </div>

                {/* 네비게이션 버튼 */}
                <div
                    className="swiper-button-prev2 absolute top-[50%] left-[-28px] transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 cursor-pointer"
                >
                    <img src={prev2} alt="이전" className="w-4 h-4"/>
                </div>
                <div
                    className="swiper-button-next2 absolute top-[50%] right-[-28px] transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10cursor-pointer"
                >
                    <img src={next2} alt="다음" className="w-4 h-4"/>
                </div>
            </div>


            {/* 모달 컴포넌트 */}
            {isModalOpen && selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <CreatorReviewReadComponent review={selectedReview} closeModal={closeModal}/>
                </div>
            )}
        </div>
    );
}

export default CreatorReviews;
