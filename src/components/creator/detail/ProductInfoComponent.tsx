function ProductInfoComponent() {
    return (
        <div className="w-full max-w-md mx-auto text-gray-800">
            {/* 카테고리 및 상품명 */}
            <p className="text-sm text-gray-500 mb-1">리빙 &gt; 유리컵/머그컵</p>
            <h1 className="text-3xl font-bold mb-4">망나니 잔</h1>
            <p className="text-2xl font-bold text-gray-800 mb-6">21,000원</p>

            {/* 수량 선택 */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">수량</h3>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 bg-gray-200 rounded-full font-bold text-lg hover:bg-gray-300">
                            -
                        </button>
                        <span className="text-xl font-semibold">1</span>
                        <button className="px-4 py-2 bg-gray-200 rounded-full font-bold text-lg hover:bg-gray-300">
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* 총 상품 금액 */}
            <div className="mb-6 border-t border-black pt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">총 상품 금액</h3>
                    <p className="text-2xl font-bold">21,000원</p>
                </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 mb-6">
                <button className="flex-1 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    장바구니
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                    바로 구매하기
                </button>
            </div>

            {/* 배송 안내 */}
            <div className="mt-6 text-sm text-gray-500 border-t pt-4">
                <p className="mb-2">배송 안내: 기본 배송비 3,000원 | 일반 택배 (CJ 대한통운)</p>
                <p className="mb-2">
                    배송출발일 : 지금 주문하면 <span className="text-blue-600 font-medium">12/4 ~ 12/11</span> 사이에
                    출발해요!
                </p>
                <p className="text-gray-400">
                    특별함을 담아 제작해서 배송해드려요. 설레는 마음으로 기다려주세요!
                </p>
            </div>
        </div>
    );
}

export default ProductInfoComponent;
