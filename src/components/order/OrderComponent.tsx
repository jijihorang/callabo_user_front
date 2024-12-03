import React, { useState } from "react";
import pro from "../../assets/img/roulette.png";
import down from "../../assets/icons/down.png";

function OrderFormPage() {
    const [isCollapsed, setIsCollapsed] = useState(true); // 슬라이드 상태
    const [startY, setStartY] = useState(0); // 터치 시작 위치

    // 터치 시작
    const handleTouchStart = (e: React.TouchEvent) => {
        setStartY(e.touches[0].clientY);
    };

    // 터치 이동
    const handleTouchMove = (e: React.TouchEvent) => {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 20) {
            setIsCollapsed(true); // 아래로 슬라이드 → 접힘
        } else if (diff < -20) {
            setIsCollapsed(false); // 위로 슬라이드 → 펼침
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
            {/* 주문자 정보 입력 폼 */}
            <div className="w-full lg:w-7/12 rounded-xl bg-white p-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">주문서 작성</h2>
                <div className="space-y-6">
                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">이메일</label>
                        <input
                            type="email"
                            placeholder="이메일을 입력해주세요."
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* 이름 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">이름</label>
                        <input
                            type="text"
                            placeholder="이름을 입력해주세요."
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* 연락처 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">연락처</label>
                        <input
                            type="tel"
                            placeholder="- 없이 숫자만 입력하세요."
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* 배송지 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">배송지</label>
                        <div className="flex gap-4 mt-2">
                            <input
                                type="text"
                                placeholder="우편번호"
                                className="block w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
                                우편번호 검색
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="기본 주소"
                            className="mt-3 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="상세 주소"
                            className="mt-3 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* 배송 메모 */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">배송 메모</label>
                        <div className="relative">
                            <select className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none">
                                <option>배송 메모를 선택해주세요.</option>
                                <option>문 앞에 놓아주세요.</option>
                                <option>직접 전달 바랍니다.</option>
                            </select>
                            {/* 드롭다운 아이콘 */}
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <img src={down} alt="다운 사진" className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 결제 방법 */}
                <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 border-t border-gray-300 pt-6">
                        결제 수단
                    </h3>
                    <div className="flex justify-center">
                        <button className="bg-blue-600 text-white px-20 py-3 w-full rounded-lg hover:bg-blue-500 shadow-md transition duration-300">
                            토스
                        </button>
                    </div>
                </div>
            </div>

            {/* 주문 정보 및 결제 버튼 */}
            <div
                className={`w-full lg:w-1/3 lg:ml-12 bg-white z-50 p-4 ${
                    window.innerWidth < 1024
                        ? `transition-transform duration-300 fixed bottom-0 left-0 shadow-lg ${
                            isCollapsed ? "translate-y-[80%]" : "translate-y-0"
                        }`
                        : "relative"
                }`}
                onTouchStart={window.innerWidth < 1024 ? handleTouchStart : undefined}
                onTouchMove={window.innerWidth < 1024 ? handleTouchMove : undefined}
            >
                <div className="sticky top-20 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-6 text-gray-800 text-center border-b-2 border-gray-400 pb-3">
                        주문 정보
                    </h2>
                    {/* 상품 정보 */}
                    <div className="flex items-center gap-4 mb-6 border-b pb-4">
                        <img src={pro} alt="상품 이미지" className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                                [한정수량] 망나니 잔 (2024년 12월 배송)
                            </h3>
                            <p className="text-sm text-gray-500">유리컵/머그컵</p>
                            <p className="text-lg font-bold text-gray-800 mt-2">15,000원</p>
                        </div>
                    </div>
                    {/* 주문 요약 */}
                    <div className="space-y-4 text-gray-700">
                        <div className="flex justify-between">
                            <span>총 수량</span>
                            <span>1개</span>
                        </div>
                        <div className="flex justify-between">
                            <span>총 상품금액</span>
                            <span>15,000원</span>
                        </div>
                        <div className="flex justify-between">
                            <span>총 배송비</span>
                            <span>3,000원</span>
                        </div>
                        <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold">
                            <span>총 주문금액</span>
                            <span>18,000원</span>
                        </div>
                    </div>
                    {/* 결제 버튼 */}
                    <div className="mt-8">
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 font-semibold">
                            결제하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderFormPage;
