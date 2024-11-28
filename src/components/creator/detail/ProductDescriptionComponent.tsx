
function ProductDescriptionComponent() {
    return (
        <div>
            {/* 상품 상세 설명 섹션 */}
            <div className="mt-5">
                <h1 className="text-2xl font-bold mb-6 border-b-2 pb-4 text-center">상품 상세</h1>
                <p className="text-lg text-gray-700 mb-4">
                    <strong>와르르 쉐이커 키링</strong>
                    <br />
                    본 상품은 예약 판매 및 주문 제작 상품입니다.
                    <br />
                    예약 주문 기간 종료 후, 단순 변심으로 인한 주문 취소/환불/변경이 불가합니다.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>예약 주문 기간: 2024년 11월 16일 (토) 11:00 ~ 2024년 12월 1일 (일) 23:59 (기간 한정)</li>
                    <li>추후 배송 가능 기간: 2024년 12월 1일 (일) 23:59 (기간 한정)</li>
                    <li>예상 배송 일정: 2024년 12월 중순부터 순차 배송 시작</li>
                </ul>
                <p className="text-gray-500 mt-4">
                    ▶ '보이스 키링' 상품은 제작 기간으로 인해 2025년 1월부터 순차 출고 예정이며, 이 외 상품은 2024년 12월부터 순차 출고 예정입니다.
                    <br />
                    ▶ 일반 예약 상품의 빠른 수령을 희망하시는 경우, '보이스 키링' 상품을 나누어 주문 및 결제를 부탁드립니다.
                </p>
            </div>

        </div>
    );
}

export default ProductDescriptionComponent;