import { IReview } from "../../../types/review/ireview.ts";
import star3 from "../../../../public/icons/star.png";
import noStar3 from "../../../../public/icons/gstar.png";
import { useEffect, useState } from "react";
import {getReviewList} from "../../../apis/review/reviewAPI.ts";

import {useParams} from "react-router-dom";
import CreatorReviewReadComponent from "../../creator/review/CreatorReviewReadComponent.tsx";

function ProductReviewComponent({ productNo }: { productNo: number }) {
    const { creatorId } = useParams();
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [selectedReview, setSelectedReview] = useState<IReview | null>(null); // 선택된 리뷰 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    const openModal = (review: IReview) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    useEffect(() => {
        // 특정 상품의 리뷰 가져오기
        getReviewList(creatorId, productNo)
            .then((data) => {
                setReviews(data);
            })
            .catch((err) => {
                console.error("리뷰 데이터를 가져오는 중 오류 발생:", err);
            });
    }, [productNo]);

    if (reviews.length === 0) {
        return <p className="text-gray-500 text-center">이 상품에 대한 리뷰가 없습니다.</p>;
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.reviewNo} className="border border-gray-300 rounded-lg p-4 shadow-md"  onClick={() => openModal(review)}>
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
                    <CreatorReviewReadComponent review={selectedReview} closeModal={closeModal} />
                </div>
            )}
        </div>
    );
}

export default ProductReviewComponent;