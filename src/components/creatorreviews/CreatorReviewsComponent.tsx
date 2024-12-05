import memenu1 from "../../assets/img/memenu1.png";
import memenu2 from "../../assets/img/memenu2.png";
import memenu3 from "../../assets/img/memenu3.png";
import memenu4 from "../../assets/img/memenu4.png";
import shirt from "../../assets/img/shirt.png"

function CreatorReviews() {
    return (
        <div className="p-8">
            {/* 제목 섹션 및 더보기 버튼 */}
            <div className="flex justify-between items-center mb-12">
                <div className="text-left">
                    <h4 className="text-sm text-gray-500 mb-2 md:text-base">팬들의 이야기가 궁금할 때</h4>
                    <h2 className="text-3xl font-bold md:text-4xl">REVIEW</h2>
                </div>
                {/* 더보기 버튼 */}
                <button className="text-blue-500 font-bold text-sm md:text-base">더보기</button>
            </div>

            {/* 리뷰 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
                {/* 리뷰 카드 */}
                {[memenu1, memenu2, memenu3, memenu4].map((image, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <img src={image} alt={`리뷰 이미지 ${index + 1}`} className="w-full h-64 object-cover rounded-lg mb-4" />
                        <div className="flex items-center space-x-2 mb-2">
                            {/* 별점 표시 */}
                            <div className="flex text-blue-600">
                                {Array(5).fill(0).map((_, i) => (
                                    <span key={i} className="text-lg md:text-xl">★</span>
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm md:text-base">2024.11.{`0${index + 3}`.slice(-2)}</span>
                        </div>
                        {/* 제품 정보 */}
                        <div className="flex items-center">
                            <img src={shirt} alt="티셔츠 아이콘" className="w-8 h-8 mr-2" />
                            <div>
                                <div className="text-sm font-semibold md:text-base">{index % 2 === 0 ? "마이비누 스터디덕의 티셔츠" : "MMMN 스몰 로고 티셔츠 블랙"}</div>
                                <div className="text-sm text-gray-500 md:text-base">{index % 2 === 0 ? "20,500 원" : "19,500 원"}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreatorReviews;
