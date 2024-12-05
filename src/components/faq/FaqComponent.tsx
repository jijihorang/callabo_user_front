function FaqComponent() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* 제목 섹션 */}
            <div className="text-center mb-12">
                <h1 className="text-2xl font-bold mb-4 sm:text-4xl">자주 묻는 질문</h1>
                <p className="text-sm text-gray-600 sm:text-base">여기에서 가장 자주 묻는 질문에 대한 답변을 확인하실 수 있습니다.</p>
            </div>

            {/* FAQ 리스트 */}
            <div className="space-y-8">
                {/* FAQ 아이템 */}
                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2 sm:text-xl">Q: 어떻게 계정을 생성할 수 있나요?</h3>
                    <p className="text-sm text-gray-700 sm:text-base">A: 홈페이지에서 '회원가입' 버튼을 클릭하고 필요한 정보를 입력하여 계정을 생성할 수 있습니다.</p>
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2 sm:text-xl">Q: 비밀번호를 어떻게 재설정하나요?</h3>
                    <p className="text-sm text-gray-700 sm:text-base">A: 로그인 페이지에서 '비밀번호 찾기'를 클릭하면 비밀번호를 재설정할 수 있는 안내 이메일을 보내드립니다.</p>
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2 sm:text-xl">Q: 구매 내역은 어디에서 확인할 수 있나요?</h3>
                    <p className="text-sm text-gray-700 sm:text-base">A: '내 계정' 섹션의 '주문 내역'에서 구매 내역을 확인하실 수 있습니다.</p>
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2 sm:text-xl">Q: 고객 지원팀에 어떻게 연락하나요?</h3>
                    <p className="text-sm text-gray-700 sm:text-base">A: 페이지 하단의 '문의하기' 링크를 클릭하거나 고객센터 전화번호 010-1234-5678으로 연락하시면 됩니다.</p>
                </div>

                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2 sm:text-xl">Q: 주문을 취소할 수 있나요?</h3>
                    <p className="text-sm text-gray-700 sm:text-base">A: 네, 주문 후 24시간 이내에 '내 계정'에서 해당 상품의 '주문 취소'를 선택하여 취소할 수 있습니다.</p>
                </div>
            </div>
        </div>
    );
}

export default FaqComponent;
