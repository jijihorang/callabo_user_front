function OrderFormPage() {
    return (
        <div className="flex flex-wrap p-20 gap-24 justify-center">

            {/* 주문자 정보 입력 폼 및 결제 방법 선택 */}
            <div className="w-full lg:w-3/6  border border-gray-300 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">주문서 작성</h2>
                <h3 className="text-lg font-semibold mb-4">주문자 정보</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">이메일</label>
                    <input type="email" placeholder="이메일을 입력해주세요." className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">이름</label>
                    <input type="text" placeholder="이름을 입력해 주세요." className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">연락처</label>
                    <input type="tel" placeholder="- 없이 숫자만 입력하세요." className="mt-1 block w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">배송지</label>
                    <div className="flex items-center space-x-4 mt-1">
                        <input type="text" className="block w-1/2 p-2 border border-gray-300 rounded"/>
                        <div className="w-1/2">
                            <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 font-semibold">
                                우편번호 검색
                            </button>
                        </div>
                    </div>
                    <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                    <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">배송 메모</label>
                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option>배송 메모를 선택해 주세요.</option>
                    </select>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">결제 방법 선택</h3>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 font-semibold">토스</button>
                </div>
            </div>

            {/* 주문 정보 및 결제 버튼 영역 */}
            <div className="w-full lg:w-1/3 border border-gray-300 rounded-lg p-8 space-y-6 bg-white shadow-lg h-full">
                {/* 배송정보 표시 */}
                <h2 className="text-xl font-bold">차린건쥐뿔도없지만</h2>

                <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
                    <img src="/path/to/product-image.png" alt="상품 이미지" className="w-20 h-20 object-cover" />
                    <div>
                        <div className="font-semibold">[한정수량] 망나니 잔 (2024년 12월 배송)</div>
                        <div className="text-gray-400 text-sm">유리컵/머그컵</div>
                        <div className="text-xl font-bold mt-2">15,000원</div>
                    </div>
                </div>

                {/* 주문 정보 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">주문정보</h3>
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
                <div className="flex justify-center mt-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 font-semibold">
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderFormPage;
