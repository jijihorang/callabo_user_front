import mangnani from "../../assets/img/mangnani.png";
import soju from "../../assets/img/soju.png";
import roulette from  "../../assets/img/roulette.png";
import bag from "../../assets/img/bag.png";
import tray from "../../assets/img/tray.png";
import X from  "../../assets/img/X.png"

function CartPage() {
    return (
        <>
            {/* 주문 정보 및 주문 버튼 영역 - 수직 플로팅 처리 필살기 :> ;-; */}
            <div
                className="fixed right-20 top-1/4 border border-gray-300 rounded-lg p-10 space-y-6 z-50 bg-white">
                {/* 주문 정보를 표시하는 박스 */}
                <h2 className="text-xl font-bold text-center">주문정보</h2>

                <div className="flex justify-between">
                    <span>총 수량</span>
                    <span>5개</span>
                </div>

                <div className="flex justify-between">
                    <span>총 상품금액</span>
                    <span>103,000원</span>
                </div>

                <div className="flex justify-between">
                    <span>총 배송비</span>
                    <span>3,000원</span>
                </div>

                <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold">
                    <span className="mr-5">총 주문금액</span>
                    <span>106,000원</span>
                </div>

                {/* 주문 버튼 */}
                <div className="flex justify-center mt-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 font-semibold">
                        주문서 작성 (5)
                    </button>
                </div>
            </div>

            {/* 상품 목록 영역 */}
            <div className="p-8 space-y-6" style={{textAlign: 'center'}}>
                <h2 className="text-xl font-bold">장바구니</h2>
                <div className="border-t border-gray-200">
                    <div className="py-4 mx-auto" style={{width: '600px', textAlign: 'center'}}>
                        <div className="font-bold text-lg text-left">
                            <div className="flex gap-4">
                                <span><input type="checkbox"/></span>
                                <span>차린건쥐뿔도없지만</span>
                            </div>
                        </div>

                        {/* 1번 상품 */}
                        <div className="flex items-center justify-between py-4 border-b border-t border-gray-200 mt-5">
                            <div className="flex items-start space-x-4">
                               <input type="checkbox" className="mt-10"/>
                                <img
                                    src={mangnani} // 상품 이미지 넣을 곳 :> 지금 망나니 컵 넣어둠 :)
                                    alt="상품 이미지"
                                    className="w-24 h-24 object-cover"
                                />
                            <div>
                                <div className="font-semibold">망나니 컵 (2024년 12월 24배송)
                                </div>
                                <div className="text-gray-400 text-xs text-left mt-1">유리컵/머그컵</div>
                                <div className="text-xl font-bold text-left mt-5">21,000원</div>
                            </div>
                            <div className="text-right">
                                <button className="mt-16 px-4 py-1 border border-gray-300 rounded text-gray-500">
                                        수량 변경
                                    </button>
                                </div>
                                <button className="text-right px-4 py-1">
                                    <img
                                        src={X} //X버튼
                                        alt="상품 이미지"
                                        className="w-4 h-4 object-cover"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* 2번 상품 */}
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                            <div className="flex items-start space-x-4">
                                <input type="checkbox" className="mt-10"/>
                                <img
                                    src={soju} // 소주 키링
                                    alt="상품 이미지"
                                    className="w-24 h-24 object-cover"
                                />
                                <div>
                                    <div className="font-semibold">소주 키링 (2024년 12월 24배송)</div>
                                    <div className="text-gray-400 text-xs text-left">키링</div>
                                    <div className="text-xl font-bold text-left mt-5">15,000원</div>
                                </div>
                                <div className="text-right">
                                    <button className="mt-16 px-4 py-1 border border-gray-300 rounded text-gray-500">
                                        수량 변경
                                    </button>
                                </div>
                                <button className="text-right px-4 py-1">
                                    <img
                                        src={X} //X버튼
                                        alt="상품 이미지"
                                        className="w-4 h-4 object-cover"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* 3번 상품 */}
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                            <div className="flex items-start space-x-4">
                                <input type="checkbox" className="mt-10"/>
                                <img
                                    src={roulette} // 룰렛 키링
                                    alt="상품 이미지"
                                    className="w-24 h-24 object-cover"
                                />
                                <div>
                                    <div className="font-semibold"> 룰렛 키링 (2024년 12월 24배송)</div>
                                    <div className="text-gray-400 text-xs text-left">키링</div>
                                    <div className="text-xl font-bold text-left mt-5">15,000원</div>
                                </div>
                                <div className="text-right">
                                    <button className="mt-16 px-4 py-1 border border-gray-300 rounded text-gray-500">
                                        수량 변경
                                    </button>
                                </div>
                                <button className="text-right px-4 py-1">
                                    <img
                                        src={X} //X버튼
                                        alt="상품 이미지"
                                        className="w-4 h-4 object-cover"
                                    />
                                </button>
                            </div>
                        </div>


                        {/* 4번 상품 */}
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                            <div className="flex items-start space-x-4">
                                <input type="checkbox" className="mt-10"/>
                                <img
                                    src={bag} // 가방
                                    alt="상품 이미지"
                                    className="w-24 h-24 object-cover"
                                />
                                <div>
                                    <div className="font-semibold"> 스트링 백 (2024년 12월 24배송)</div>
                                    <div className="text-gray-400 text-xs text-left">가방</div>
                                    <div className="text-xl font-bold text-left mt-5">22,000원</div>
                                </div>
                                <div className="text-right">
                                    <button className="mt-16 px-4 py-1 border border-gray-300 rounded text-gray-500">
                                        수량 변경
                                    </button>
                                </div>
                                <button className="text-right px-4 py-1">
                                    <img
                                        src={X} //X버튼
                                        alt="상품 이미지"
                                        className="w-4 h-4 object-cover"
                                    />
                                </button>
                            </div>
                        </div>
                        {/* 5번 상품 */}
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                            <div className="flex items-start space-x-4">
                                <input type="checkbox" className="mt-10"/>
                                <img
                                    src={tray} // 가방
                                    alt="상품 이미지"
                                    className="w-24 h-24 object-cover"
                                />
                                <div>
                                    <div className="font-semibold">당당 혼밥 (2024년 12월 24배송)</div>
                                    <div className="text-gray-400 text-xs text-left">가방</div>
                                    <div className="text-xl font-bold text-left mt-5">30,000원</div>
                                </div>
                                <div className="text-right">
                                    <button className="mt-16 px-4 py-1 border border-gray-300 rounded text-gray-500">
                                        수량 변경
                                    </button>
                                </div>
                                <button className="text-right px-4 py-1">
                                    <img
                                        src={X} //X버튼
                                        alt="상품 이미지"
                                        className="w-4 h-4 object-cover"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPage;
