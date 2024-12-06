import memenu1 from "../../../assets/img/알치날.png";
import memenu2 from "../../../assets/img/스마트톡.png";
import memenu3 from "../../../assets/img/알치날.png";
import memenu4 from "../../../assets/img/스마트톡.png";
import {useState} from "react";
import shirt from "../../../assets/img/shirt.png";
import CreatorReviewReadComponent from "./CreatorReviewReadComponent.tsx";

function CreatorReviewListComponent() {
    const allReviews = [
        { image: memenu1, title: "마이비누 스터디덕의 티셔츠", price: "20,500 원", date: "2024.11.03" },
        { image: memenu2, title: "MMMN 스몰 로고 티셔츠 블랙", price: "19,500 원", date: "2024.11.04" },
        { image: memenu3, title: "마이비누 스터디덕의 티셔츠", price: "20,500 원", date: "2024.11.05" },
        { image: memenu4, title: "MMMN 스몰 로고 티셔츠 블랙", price: "19,500 원", date: "2024.11.06" },
        { image: memenu1, title: "마이비누 스터디덕의 티셔츠", price: "20,500 원", date: "2024.11.07" },
        { image: memenu2, title: "MMMN 스몰 로고 티셔츠 블랙", price: "19,500 원", date: "2024.11.08" },
        { image: memenu3, title: "마이비누 스터디덕의 티셔츠", price: "20,500 원", date: "2024.11.09" },
        { image: memenu4, title: "MMMN 스몰 로고 티셔츠 블랙", price: "19,500 원", date: "2024.11.10" },
    ];

    const [visibleReviews, setVisibleReviews] = useState(allReviews.slice(0, 4)); // 처음 4개의 리뷰만 표시
    const [expanded, setExpanded] = useState(false); // "See More" / "Close" 상태 관리
    const [selectedReview, setSelectedReview] = useState(null); // 선택된 리뷰 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    const toggleReviews = () => {
        if (expanded) {
            setVisibleReviews(allReviews.slice(0, 4)); // 처음 4개의 리뷰만 표시
        } else {
            setVisibleReviews(allReviews); // 모든 리뷰 표시
        }
        setExpanded(!expanded); // 상태 토글
    };

    const openModal = (review: any) => {
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
                            className="px-6 py-2 text-gray-500 border border-gray-400 rounded-lg transition"
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
                            src={review.image}
                            alt={`리뷰 이미지 ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <div className="flex items-center space-x-2 mb-2">
                            {/* 별점 표시 */}
                            <div className="flex text-blue-600">
                                {Array(5).fill(0).map((_, i) => (
                                    <span key={i} className="text-lg md:text-xl">★</span>
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm md:text-base">{review.date}</span>
                        </div>
                        {/* 제품 정보 */}
                        <div className="flex items-center">
                            <img src={shirt} alt="티셔츠 아이콘" className="w-8 h-8 mr-2" />
                            <div>
                                <div className="text-sm font-semibold md:text-base">{review.title}</div>
                                <div className="text-sm text-gray-500 md:text-base">{review.price}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 모달 컴포넌트 */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <CreatorReviewReadComponent review={selectedReview} closeModal={closeModal} />
                </div>
            )}
        </div>
    );
}
export default CreatorReviewListComponent;