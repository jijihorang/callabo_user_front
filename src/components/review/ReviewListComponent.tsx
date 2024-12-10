import { useState } from "react";
import star3 from "../../assets/icons/star.png";
import noStar3 from "../../assets/icons/gstar.png";
import ReviewReadComponent from "./ReviewReadComponent.tsx";

function ReviewListComponent() {
    // 더미 데이터
    const reviews = [
        {
            reviewNo: 1,
            customerName: "John Doe",
            createdAt: "2024-12-01",
            rating: 4,
            comment: "제품이 매우 만족스럽습니다!",
            reviewImages: [
                { reviewImageNo: 1, reviewImageUrl: "https://via.placeholder.com/100" },
                { reviewImageNo: 2, reviewImageUrl: "https://via.placeholder.com/100" },
            ],
        },
        {
            reviewNo: 2,
            customerName: "Jane Smith",
            createdAt: "2024-12-03",
            rating: 5,
            comment: "빠른 배송과 좋은 품질에 감사드립니다.",
            reviewImages: [
                { reviewImageNo: 3, reviewImageUrl: "https://via.placeholder.com/100" },
            ],
        },
        {
            reviewNo: 3,
            customerName: "Alice Johnson",
            createdAt: "2024-12-05",
            rating: 3,
            comment: "괜찮은 제품이지만 배송이 늦었어요.",
            reviewImages: [
                { reviewImageNo: 3, reviewImageUrl: "https://via.placeholder.com/100" },
            ],
        },
    ];

    // 모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    // 모달 열기
    const openModal = (review: any) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setSelectedReview(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto mt-5 pb-5 px-4 lg:px-8">
            {reviews.map((review) => (
                <div
                    key={review.reviewNo}
                    className="border border-gray-300 rounded-lg p-4 shadow-md mb-4"
                    onClick={() => openModal(review)}
                >
                    <div className="flex items-center mb-4">
                        <div>
                            <p className="font-bold">{review.customerName}</p>
                            <p className="text-gray-500 text-sm">{review.createdAt}</p>
                        </div>
                    </div>

                    {/* 별점 */}
                    <div className="flex items-center mb-2">
                        {Array(5)
                            .fill(0)
                            .map((_, i) => (
                                <img
                                    key={i}
                                    src={i < review.rating ? star3 : noStar3}
                                    alt={i < review.rating ? "별점 채움" : "별점 비움"}
                                    className="w-4 h-4"
                                />
                            ))}
                    </div>

                    {/* 리뷰 내용 */}
                    <p className="text-gray-800">{review.comment}</p>

                    {/* 리뷰 이미지 */}
                    {review.reviewImages && review.reviewImages.length > 0 && (
                        <div className="flex mt-4 space-x-2">
                            {review.reviewImages.map((img) => (
                                <img
                                    key={img.reviewImageNo}
                                    src={img.reviewImageUrl}
                                    alt="리뷰 이미지"
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* 모달 컴포넌트 */}
            {isModalOpen && selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <ReviewReadComponent review={selectedReview} closeModal={closeModal}/>
                </div>
            )}
        </div>
    );
}

export default ReviewListComponent;
