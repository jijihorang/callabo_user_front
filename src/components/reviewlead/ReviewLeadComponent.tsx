
import { useState } from "react";

function ReviewPopup() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="p-4">
            {/* 버튼 */}
            <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                리뷰 보기
            </button>

            {/* 모달 */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-4 relative">
                        {/* 닫기 버튼 */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>

                        {/* 이미지 섹션 */}
                        <div className="flex">
                            <img
                                src="/path/to/main-image.jpg" /* 메인 이미지 경로 */
                                alt="리뷰 이미지"
                                className="w-1/2 h-auto rounded-lg mr-4"
                            />
                            <div className="flex flex-col">
                                {/* 유저 정보 */}
                                <div className="flex items-center mb-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-gray-500 font-bold">G</span>
                                    </div>
                                    <div className="ml-2">
                                        <div className="text-sm font-bold">g*****@gmail.com</div>
                                        <div className="text-xs text-gray-500">2024.10.26</div>
                                    </div>
                                </div>

                                {/* 별점 */}
                                <div className="flex text-yellow-500 mb-2">
                                    ★★★★★
                                </div>

                                {/* 리뷰 내용 */}
                                <div className="text-sm text-gray-800">
                                    겁나 큐트합니다! 오래쓰도록 하겠습니다! 화이팅!♡
                                </div>
                            </div>
                        </div>

                        {/* 제품 정보 */}
                        <div className="mt-4 border-t pt-4">
                            <div className="flex items-center">
                                <img
                                    src="/path/to/product-image.jpg" /* 제품 이미지 경로 */
                                    alt="제품 이미지"
                                    className="w-16 h-16 rounded-lg mr-4"
                                />
                                <div>
                                    <div className="font-bold">집에보내줘 스마트톡</div>
                                    <div className="text-sm text-gray-500">
                                        옵션: 4 x 4 cm
                                    </div>
                                    <div className="text-sm text-gray-800">10,000 원</div>
                                </div>
                            </div>
                        </div>

                        {/* 댓글 섹션 */}
                        <div className="mt-4">
                            <div className="text-sm text-gray-500 mb-2">댓글 0개</div>
                            <div className="flex items-center border-t pt-4">
                                <input
                                    type="text"
                                    placeholder="크리에이터를 응원하는 댓글을 남겨주세요."
                                    className="flex-1 border rounded-lg px-2 py-1 text-sm"
                                />
                                <button className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-lg text-sm">
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReviewPopup;
