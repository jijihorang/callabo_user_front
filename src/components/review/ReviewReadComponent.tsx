import star2 from "../../assets/icons/star.png";
import noStar2 from "../../assets/icons/gstar.png";

interface ReviewReadProps {
    review: {
        reviewImages: { reviewImageNo: number; reviewImageUrl: string }[];
        customerName: string;
        createdAt: string;
        rating: number;
        comment: string;
        productImages: { productImageNo: number; productImageUrl: string }[];
        productName: string;
        productPrice: number;
        reply?: string;
    };
    closeModal: () => void;
}

function ReviewReadComponent({ review, closeModal }: ReviewReadProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal} // 배경 클릭 시 모달 닫기
        >
            <div
                className="p-6 bg-white rounded-lg w-11/12 max-w-3xl relative shadow-lg"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 부모 이벤트 전파 방지
            >
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
                                review.reviewImages?.[0]?.reviewImageUrl ||
                                "https://via.placeholder.com/150"
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
                                    {review.customerName?.charAt(0).toUpperCase() || "?"}
                                </span>
                            </div>
                            <div>
                                <div className="text-sm font-bold">{review.customerName || "익명 사용자"}</div>
                                <div className="text-xs text-gray-500">{review.createdAt || "날짜 정보 없음"}</div>
                            </div>
                        </div>

                        {/* 별점 */}
                        <div className="flex items-center space-x-1">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <img
                                        key={i}
                                        src={i < review.rating ? star2 : noStar2}
                                        alt={i < review.rating ? "별점 채움" : "별점 비움"}
                                        className="w-4 h-4"
                                    />
                                ))}
                        </div>

                        {/* 리뷰 내용 */}
                        <div className="text-sm text-gray-800">{review.comment || "리뷰 내용이 없습니다."}</div>

                        {/* 상품 정보 */}
                        <div className="mt-4 p-4 flex items-center space-x-4 border border-gray-200 rounded-lg shadow-sm">
                            <img
                                src={
                                    review.productImages?.[0]?.productImageUrl ||
                                    "https://via.placeholder.com/150"
                                }
                                alt="제품 이미지"
                                className="w-16 h-16 rounded-lg object-cover shadow-sm"
                            />
                            <div>
                                <div className="text-base font-bold">{review.productName || "상품명 정보 없음"}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {review.productPrice
                                        ? `${review.productPrice.toLocaleString()}원`
                                        : "가격 정보 없음"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 판매자 답변 */}
                <div className="mt-6 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                    <span className="text-blue-600 font-bold">판매자 답변 </span>
                    <span className="text-gray-800">
                        : {review.reply || "판매자의 답변이 없습니다."}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ReviewReadComponent;
