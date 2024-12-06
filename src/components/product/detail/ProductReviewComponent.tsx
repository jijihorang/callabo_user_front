import {IReview} from "../../../types/review/ireview.ts";

import star3 from "../../../assets/icons/star.png";
import noStar3 from "../../../assets/icons/gstar.png";

function ProductReviewComponent({ reviews, productNo }: { reviews?: IReview[]; productNo: number }) {
    // 상품에 해당하는 리뷰만 필터링
    const filteredReviews = reviews?.filter((review) => review.reviewNo === productNo);

    if (!filteredReviews || filteredReviews.length === 0) {
        return <p className="text-gray-500 text-center">이 상품에 대한 리뷰가 없습니다.</p>;
    }

    return (
        <div className="space-y-4">
            {filteredReviews.map((review) => (
                <div key={review.reviewNo} className="border border-gray-300 rounded-lg p-4 shadow-md">
                    <div className="flex items-center mb-4">
                        {/* 사용자 프로필 이미지 */}
                        {/*<img*/}
                        {/*    src={review.customerProfileImage || "https://via.placeholder.com/50"}*/}
                        {/*    alt="사용자 프로필"*/}
                        {/*    className="w-12 h-12 rounded-full mr-4"*/}
                        {/*/>*/}
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

                    {/* 판매자 답변 */}
                    {review.reply && (
                        <div className="mt-4 bg-gray-100 p-2 rounded-lg">
                            <span className="font-bold text-blue-600">판매자 답변</span>
                            <span className="text-gray-800">: {review.reply || "판매자의 답변이 없습니다."}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProductReviewComponent;
