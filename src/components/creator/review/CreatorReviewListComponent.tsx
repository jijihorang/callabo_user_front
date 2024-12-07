import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams import 추가
import CreatorReviewReadComponent from "./CreatorReviewReadComponent";
import {IReview} from "../../../types/review/ireview.ts";
import {getReviewList} from "../../../apis/review/reviewAPI.ts";
import star1 from "../../../assets/icons/star.png";
import noStar1 from "../../../assets/icons/gstar.png";

function CreatorReviews() {
    const { creatorId } = useParams<{ creatorId: string }>(); // URL에서 creatorId 추출
    const [allReviews, setAllReviews] = useState<IReview[]>([]); // 모든 리뷰 데이터
    const [visibleReviews, setVisibleReviews] = useState<IReview[]>([]); // 현재 화면에 표시되는 리뷰
    const [expanded, setExpanded] = useState(false); // "See More" / "Close" 상태 관리
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
                setVisibleReviews(response.slice(0, 4)); // 처음 4개의 리뷰만 표시
            } catch (error) {
                console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchReviews();
    }, [creatorId]);

    // "See More" / "Close" 버튼 클릭 핸들러
    const toggleReviews = () => {
        if (expanded) {
            setVisibleReviews(allReviews.slice(0, 4)); // 처음 4개의 리뷰만 표시
        } else {
            setVisibleReviews(allReviews); // 모든 리뷰 표시
        }
        setExpanded(!expanded); // 상태 토글
    };

    const openModal = (review: IReview) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <div className="container mx-auto mb-20 px-4">
            <div className="px-4">
                {/* 제목 섹션 */}
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-[15px]">솔직한</h2>
                        <h1 className="text-[30px] font-bold">REVIEW</h1>
                    </div>

                    {/* "See More" / "Close" 버튼 */}
                    <div className="text-center mt-8">
                        <button
                            className="px-3 py-2 text-gray-500 border border-gray-400 rounded-lg transition"
                            onClick={toggleReviews}
                        >
                            {expanded ? "Close" : "See More"}
                        </button>
                    </div>
                </div>
            </div>

            {/* 리뷰 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
                {visibleReviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                        onClick={() => openModal(review)} // 클릭 시 모달 열기
                    >
                        <img
                            src={
                                review.reviewImages && review.reviewImages.length > 0
                                    ? review.reviewImages[0].reviewImageUrl // 첫 번째 리뷰 이미지 URL 사용
                                    : "https://via.placeholder.com/150" // 기본 이미지 URL
                            }
                            alt={`리뷰 이미지 ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg mb-4"
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
                            <span className="text-gray-400 text-sm md:text-base">{review.createdAt}</span>
                        </div>
                        {/* 제품 정보 */}
                        <div className="flex items-center">
                            <div>
                                <div className="text-sm font-semibold md:text-base">{review.productName}</div>
                                <div>{review.productPrice}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 모달 컴포넌트 */}
            {isModalOpen && selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <CreatorReviewReadComponent review={selectedReview} closeModal={closeModal} />
                </div>
            )}
        </div>
    );
}

export default CreatorReviews;
