import { IReview } from "../../../types/review/ireview.ts";
import star2 from "../../../assets/icons/star.png";
import noStar2 from "../../../assets/icons/gstar.png";

function CreatorReviewReadComponent({ review, closeModal }: { review: IReview; closeModal: () => void }) {
    const maxStars = 5; // 별점 최대값

    return (
        <div className="p-6 bg-white rounded-lg w-11/12 max-w-3xl mx-auto relative shadow-lg">
            {/* 닫기 버튼 */}
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={closeModal}
            >
                ✕
            </button>

            {/* 전체 컨테이너 */}
            <div className="flex flex-col md:flex-row md:space-x-6">
                {/* 왼쪽: 리뷰 이미지 */}
                <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
                    <img
                        src={
                            review.reviewImages && review.reviewImages.length > 0
                                ? review.reviewImages[0].reviewImageUrl
                                : "https://via.placeholder.com/150"
                        }
                        alt="리뷰 이미지"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>

                {/* 오른쪽: 리뷰 및 상품 정보 */}
                <div className="flex flex-col flex-grow space-y-4">
                    {/* 사용자 정보 */}
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 font-bold">
                                {review.customerName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <div className="text-sm font-bold">{review.customerName}</div>
                            <div className="text-xs text-gray-500">{review.createdAt}</div>
                        </div>
                    </div>

                    {/* 별점 */}
                    <div className="flex items-center space-x-1">
                        {Array.from({ length: maxStars }).map((_, i) => (
                            <img
                                key={i}
                                src={i < review.rating ? star2 : noStar2}
                                alt={i < review.rating ? "별점 채움" : "별점 비움"}
                                className="w-4 h-4"
                            />
                        ))}
                    </div>

                    {/* 리뷰 내용 */}
                    <div className="text-sm text-gray-800">{review.comment}</div>

                    {/* 상품 정보 */}
                    <div className="mt-4 p-4 flex items-center space-x-4 border border-gray-200 rounded-lg shadow-sm">
                        <img
                            src={
                                review.productImages && review.productImages.length > 0
                                    ? review.productImages[0].productImageUrl
                                    : "https://via.placeholder.com/150"
                            }
                            alt="제품 이미지"
                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                        />
                        <div>
                            <div className="text-base font-bold">{review.productName}</div>
                            <div className="text-sm text-gray-500 mt-1">
                                {review.productPrice.toLocaleString()}원
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 판매자 답변 */}
            <div className="mt-6 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                <span className="text-blue-600 font-bold">판매자 답변 </span>
                <span className="text-gray-800">: {review.reply || "판매자의 답변이 없습니다."}</span>
            </div>
        </div>
    );
}

export default CreatorReviewReadComponent;
