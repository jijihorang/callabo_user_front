function ProductDescriptionComponent({ productDescription }: { productDescription: string }) {
    return (
        <div className="bg-white rounded-lg p-4 md:p-6">
            {/* 상품 상세 설명 섹션 */}
            <div className="mt-5">
                <p className="text-xl font-bold text-gray-800 mb-4">
                    {productDescription || "상품 설명이 없습니다."}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                    본 상품은 예약 판매 및 주문 제작 상품입니다. 예약 주문 기간 종료 후, 단순 변심으로 인한 주문 취소/환불/변경이 불가합니다.
                </p>
                <ul className="list-disc pl-5 text-gray-800 space-y-2">
                    <li>
                        <span className="font-semibold">예약 주문 기간:</span> 2024년 11월 16일 (토) 11:00 ~ 2024년 12월 1일 (일) 23:59 (기간 한정)
                    </li>
                    <li>
                        <span className="font-semibold">추후 배송 가능 기간:</span> 2024년 12월 1일 (일) 23:59 (기간 한정)
                    </li>
                    <li>
                        <span className="font-semibold">예상 배송 일정:</span> 2024년 12월 중순부터 순차 배송 시작
                    </li>
                </ul>
                <p className="text-gray-500 mt-6 leading-relaxed">
                    <span className="font-semibold text-black">▶ 상품:</span> 제작 기간으로 인해 2025년 1월부터 순차 출고 예정이며, 이 외 상품은 2024년 12월부터 순차 출고 예정입니다.
                    <br />
                    <span className="font-semibold text-black mt-3">▶ 일반 예약 상품:</span> 빠른 수령을 희망하시는 경우, 상품을 나누어 주문 및 결제를 부탁드립니다.
                </p>
            </div>
        </div>
    );
}

export default ProductDescriptionComponent;
