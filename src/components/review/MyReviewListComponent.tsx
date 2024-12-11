import { useState, useEffect } from "react";
import { IReview } from "../../types/review/ireview.ts";
import { getMyReviews } from "../../apis/review/reviewAPI.ts"; // API 호출 함수
import ReviewReadComponent from "./ReviewReadComponent.tsx";
import useAuthStore from "../../stores/customer/AuthStore.ts";
import heart from "../../assets/icons/heart.png"
import {useNavigate} from "react-router-dom";

function MyReviewListComponent() {
    const { customer } = useAuthStore(); // useAuthStore에서 customer 가져오기
    const [reviews, setReviews] = useState<IReview[]>([]); // 리뷰 데이터 저장
    const [selectedReview, setSelectedReview] = useState<IReview | null>(null); // 선택된 리뷰
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    // 모달 열기 및 리뷰 데이터 로드
    const openModal = (review: IReview) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!customer?.customerId) {
                console.error("로그인된 사용자 정보가 없습니다.");
                return;
            }

            try {
                setLoading(true);
                const fetchedReviews = await getMyReviews(customer.customerId); // customerId로 리뷰 데이터 가져오기
                setReviews(fetchedReviews);
            } catch (error) {
                console.error("내가 쓴 리뷰를 가져오는 데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [customer?.customerId]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <>
            <div className="container mx-auto mt-5 pb-5 px-4 lg:px-8">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold">내가 쓴 리뷰</h1>
                </div>
                {reviews.length === 0 ? (
                    // 리뷰가 없을 경우
                    <div className="flex flex-col items-center justify-center h-96">
                        <img
                            src={heart}
                            alt="리뷰 아이콘"
                            className="w-20 h-20 mb-6"
                        />
                        <p className="text-lg font-bold mb-2">
                            작성한 리뷰가 없어요
                        </p>
                        <p className="text-gray-600 mb-6">
                            내 취향의 상품을 구매하고 첫 리뷰를 남겨 보세요!
                        </p>
                        <button
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                            onClick={() => navigate(`/creator/list`)} // 상품 구경 페이지로 이동
                        >
                            상품 구경하기
                        </button>
                    </div>
                ) : (
                    // 리뷰가 있을 경우
                    <div className="grid gap-4 lg:grid-cols-1">
                        {reviews.map((review) => (
                            <div
                                key={review.reviewNo}
                                className="p-4 bg-white rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center cursor-pointer"
                                onClick={() => openModal(review)} // 선택된 리뷰 데이터 설정
                            >
                                <div className="text-sm text-gray-500 font-bold mb-2 lg:mb-0">
                                    No. {review.reviewNo}
                                </div>

                                <div className="flex-1 mb-2 lg:mb-0 lg:px-4">
                                    <h2 className="text-lg font-bold text-gray-800 truncate">
                                        {review.productName}
                                    </h2>
                                    <p className="text-gray-600 truncate">{review.comment}</p>
                                </div>

                                <div className="text-sm text-gray-500">{review.createdAt}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 모달 */}
            {isModalOpen && selectedReview && (
                <ReviewReadComponent
                    review={selectedReview} // 선택된 리뷰 데이터 전달
                    closeModal={closeModal}
                />
            )}
        </>
    );
}

export default MyReviewListComponent;
