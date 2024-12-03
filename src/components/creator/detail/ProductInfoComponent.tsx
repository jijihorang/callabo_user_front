import wheart from "../../../assets/icons/whiteheart.png";

function ProductInfoComponent() {
    return (
        <div className="w-full max-w-md mx-auto text-gray-800">
            <div className="mb-6">
                {/* 카테고리 및 제목 */}
                <p className="text-sm text-gray-500 mb-1">리빙 &gt; 유리컵/머그컵</p>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">망나니 잔</h1>
                    {/* 찜 버튼 (웹에서만 표시) */}
                    <button className="p-2 transition hidden lg:block">
                        <img src={wheart} alt="상품 찜" className="w-6 h-6" />
                    </button>
                </div>

                {/* 가격 */}
                <p className="text-2xl font-bold text-gray-800 mt-4">21,000원</p>
                <p className="mt-2">19개 리뷰보기</p>
            </div>

            {/* 수량 선택 (웹에서만 표시) */}
            <div className="mb-4 hidden lg:flex justify-between">
                <div className="flex items-center">
                    <h3 className="text-lg font-medium">수량</h3>
                </div>
                <div>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1">
                        <button className="px-2 py-1 font-bold text-lg focus:outline-none">−</button>
                        <span className="text-lg font-semibold text-gray-800">1</span>
                        <button className="px-2 py-1 font-bold text-lg focus:outline-none">+</button>
                    </div>
                </div>
            </div>

            {/* 총 상품 금액 (웹에서만 표시) */}
            <div className="mb-6 border-t border-black pt-4 hidden lg:flex justify-between">
                <div className="flex items-center ">
                    <h3 className="text-lg font-medium">총 상품 금액</h3>
                </div>
                <div>
                    <p className="text-2xl font-bold">21,000원</p>
                </div>
            </div>

            {/* 버튼 (웹에서만 표시) */}
            <div className="flex gap-4 mb-6 hidden lg:flex">
                <button className="flex-1 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                    장바구니
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                    바로 구매하기
                </button>
            </div>

            {/* 배송 안내 (웹에서만 표시) */}
            <div className="mt-6 text-sm text-gray-500 border-t pt-4 hidden lg:block">
                <p className="mb-2">배송 안내: 기본 배송비 3,000원 | 일반 택배 (CJ 대한통운)</p>
                <p className="mb-2">
                    배송출발일 : 지금 주문하면 <span className="text-blue-600 font-medium">12/4 ~ 12/11</span> 사이에 출발해요!
                </p>
                <p className="text-gray-400">
                    특별함을 담아 제작해서 배송해드려요. 설레는 마음으로 기다려주세요!
                </p>
            </div>
        </div>
    );
}

export default ProductInfoComponent;
