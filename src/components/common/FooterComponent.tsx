function FooterComponent() {
    return (
        <footer className="bg-white text-gray-700 border-t border-gray-400">
            {/* 푸터 1 */}
            <div className="container mx-auto py-8 flex flex-col md:flex-row justify-between">
                {/* 왼쪽 섹션 */}
                <div className="w-full md:w-1/2 space-y-4">
                    <div>
                        <span className="text-2xl md:text-3xl font-bold">Logo️ 🎁</span>
                    </div>

                    <p className="text-xs md:text-sm leading-5">
                        (주)로고퍼레이션 사업자등록번호 111-55-15322 통신판매업신고번호 2022-부산센텀-1310 <br />
                        부산광역시 센텀시티 큐비센텀타워 10층 개인정보보호책임자
                    </p>
                    <p className="text-xs md:text-sm leading-5">
                        크리에이터 상품의 경우 (주)로고의 통신판매중개자로서 통신판매의 당사자가 아니며 상품, 거래정보, 거래에 책임을 지지 않습니다.
                    </p>
                </div>

                {/* 오른쪽 섹션 */}
                <div className="w-full md:w-1/2 space-y-4 text-left md:text-right mt-7 md:mt-0">
                    <p className="text-xs md:text-lg font-bold">고객센터 1566-5555</p>
                    <p className="text-xs md:text-sm">평일 10:00 - 18:00 (토·일·공휴일 휴무)</p>
                    <p className="text-xs md:text-sm">상품/배송 문의: cs@logo.com</p>
                    <p className="text-xs md:text-sm">샵 운영 문의: partner@logo.com</p>
                    <p className="text-xs md:text-sm">제작/오프라인 팝업스토어 문의: biz@logo.com</p>
                </div>
            </div>

            {/* 푸터 2 */}
            <div className="border-t border-gray-300 py-6 text-center text-xs md:text-sm">
                &copy; 2024 Logo Corporation.
            </div>
        </footer>
    );
}

export default FooterComponent;
