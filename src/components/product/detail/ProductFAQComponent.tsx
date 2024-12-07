function ProductFAQComponent() {
    return (
        <div className="bg-white rounded-lg p-4 md:p-6">
            {/* 배송 정보 */}
            <div className="mb-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">배송 정보</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    모든 상품은 고객님의 주문에 맞춰 새 상품으로 제작하여 배송됩니다. 지금 주문하신 상품은
                    <span className="font-semibold text-black"> 12월 11일부터 제작</span> 프로세스가 시작되어
                    <span className="font-semibold text-black"> 12월 18일 이전에 출고</span>될 예정입니다.
                </p>
                <ul className="list-disc pl-5 text-gray-800 space-y-2">
                    <li><strong>배송 방법:</strong> 일반택배 (CJ대한통운)</li>
                    <li><strong>배송 지역:</strong> 전국</li>
                    <li><strong>배송 기간:</strong> 상품 출고 후 영업일 기준 1~3일 이내 수령 가능</li>
                </ul>
            </div>

            {/* 교환/환불 정보 */}
            <div className="mb-6 border-t pt-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">교환/환불 정보</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    모든 로고샵 배송 상품은 <span className="font-semibold">주문 제작 방식</span>으로 제작되어 단순 변심으로 인한 교환/환불이 불가합니다.
                    단, 수령하신 상품에 이상이 있거나 오배송된 경우에는 <span className="font-semibold">7일 이내</span> 고객센터 또는 이메일로 문의 주시면 교환 및 반품 처리가 가능합니다.
                </p>
                <ul className="list-disc pl-5 text-gray-800 space-y-2">
                    <li><strong>고객 센터:</strong> 1566-5496</li>
                    <li><strong>이메일:</strong> cs@logoshop.com</li>
                </ul>
            </div>

            {/* 신고 안내 */}
            <div className="border-t pt-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">신고 안내</h2>
                <p className="text-gray-700 leading-relaxed">
                    로고샵은 크리에이터와 소비자, 저작권 보호를 위해 신고센터를 운영하고 있습니다. 상품의 내부 규정을 위반하는 크리에이터와
                    제3자 저작권의 무단 도용을 심각하게 위반한 상품을 신고할 수 있습니다.
                </p>
            </div>
        </div>
    );
}

export default ProductFAQComponent;
