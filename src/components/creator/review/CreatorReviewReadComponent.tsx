import {IReview} from "../../types/review/ireview.ts";

function CreatorReviewReadComponent({ review, closeModal }: { review: IReview; closeModal: () => void }) {
    return (
        <div className="p-4 bg-white rounded-lg w-full max-w-2xl p-2 md:p-3 relative">
            {/* 닫기 버튼 */}
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={closeModal}
            >
                ✕
            </button>

            {/* 이미지 섹션 */}
            <div className="flex flex-col md:flex-row">
                <img
                    src={
                        review.reviewImages && review.reviewImages.length > 0
                            ? review.reviewImages[0].reviewImageUrl // 첫 번째 리뷰 이미지
                            : "https://via.placeholder.com/150" // 기본 이미지
                    }
                    alt="리뷰 이미지"
                    className="w-full md:w-1/2 h-auto rounded-lg mr-0 md:mr-4 mb-4 md:mb-0"
                />
                <div className="flex flex-col">
                    {/* 유저 정보 */}
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 font-bold">
                                {review.customerName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-2">
                            <div className="text-sm font-bold">{review.customerName}</div>
                            <div className="text-xs text-gray-500">{review.createdAt}</div>
                        </div>
                    </div>

                    {/* 별점 */}
                    <div className="flex text-yellow-500 mb-2">
                        {Array(review.rating)
                            .fill(0)
                            .map((_, i) => (
                                <span key={i}>★</span>
                            ))}
                    </div>

                    {/* 리뷰 내용 */}
                    <div className="text-sm text-gray-800">{review.comment}</div>
                </div>
            </div>

            {/* 제품 정보 */}
            <div className="mt-2 pt-2 md:mt-3 md:pt-3">
                <div className="bg-white border-2 border-gray-300 rounded-lg">
                    <div className="flex flex-col md:flex-row items-center ml-4 mt-2 md:mt-3 mb-2 md:mb-3">
                        <img
                            src={
                                review.reviewImages && review.reviewImages.length > 0
                                    ? review.reviewImages[0].reviewImageUrl // 첫 번째 리뷰 이미지
                                    : "https://via.placeholder.com/150" // 기본 이미지
                            }
                            alt="제품 이미지"
                            className="w-16 h-16 rounded-lg mr-0 md:mr-4 mb-4 md:mb-0"
                        />
                        <div>
                            <div className="font-bold">{review.productName}</div>
                            <div className="text-sm text-gray-500">{review.productDescription}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="mt-6 md:mt-12">
                <div className="text-sm text-gray-500 mb-2">댓글 없음</div>
                <div className="flex flex-col md:flex-row items-center border-t pt-2 md:pt-3">
                    <input
                        type="text"
                        placeholder="크리에이터를 응원하는 댓글을 남겨주세요."
                        className="flex-1 border rounded-lg px-2 py-1 text-sm mb-4 md:mb-0"
                    />
                    <button className="ml-0 md:ml-2 px-4 py-1 bg-blue-500 text-white rounded-lg text-sm">
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatorReviewReadComponent;
