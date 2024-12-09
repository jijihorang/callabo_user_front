import useAuthStore from "../../../stores/customer/AuthStore.ts";
import {useState} from "react";
import {useDaumPostcodePopup} from "react-daum-postcode";
import {createOrders} from "../../../apis/order/orderAPI.ts";
import down from "../../../assets/icons/down.png";

function ProductOrderComponent() {
    const { customer } = useAuthStore();

    const [customerId] = useState(customer?.customerId || "");
    const [recipientName, setRecipientName] = useState(customer?.customerName || "");
    const [recipientPhone, setRecipientPhone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [deliveryMemo, setDeliveryMemo] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [startY, setStartY] = useState(0);

    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const handleAddressSearch = () => {
        open({
            onComplete: (data) => {
                setPostalCode(data.zonecode);
                setAddress(data.address);
            },
        });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 20) {
            setIsCollapsed(true);
        } else if (diff < -20) {
            setIsCollapsed(false);
        }
    };

    const handlePayment = async () => {
        try {
            if (!customerId) {
                alert("로그인이 필요합니다.");
                return;
            }

            const orderData = [
                {
                    creatorId: "creator1",
                    customerId,
                    recipientName,
                    recipientPhone,
                    customerAddress: address,
                    customerAddrDetail: addressDetail,
                    totalAmount: 1,
                    totalPrice: 18000,
                    items: [
                        {
                            productNo: 1,
                            productName: "[한정수량] 망나니 잔 (2024년 12월 배송)",
                            quantity: 1,
                            unitPrice: 15000,
                        },
                    ],
                },
            ];

            const response = await createOrders(orderData);
            console.log("Order created successfully:", response);

            alert("주문이 성공적으로 완료되었습니다!");
        } catch (error: any) {
            console.error("Order creation failed:", error.message);
            alert("주문 생성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
            {/* 주문자 정보 입력 폼 */}
            <div className="w-full lg:w-7/12 rounded-xl bg-white p-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">주문서 작성</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">이름</label>
                        <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="이름을 입력해주세요."
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">연락처</label>
                        <input
                            type="tel"
                            value={recipientPhone}
                            onChange={(e) => setRecipientPhone(e.target.value)}
                            placeholder="- 없이 숫자만 입력하세요."
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">배송지</label>
                        <div className="flex gap-4 mt-2">
                            <input
                                type="text"
                                value={postalCode}
                                placeholder="우편번호"
                                className="block w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                readOnly
                            />
                            <button
                                onClick={handleAddressSearch}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                            >
                                우편번호 검색
                            </button>
                        </div>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="기본 주소"
                            className="mt-3 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            readOnly
                        />
                        <input
                            type="text"
                            value={addressDetail}
                            onChange={(e) => setAddressDetail(e.target.value)}
                            placeholder="상세 주소"
                            className="mt-3 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">배송 메모</label>
                        <div className="relative">
                            <select
                                value={deliveryMemo}
                                onChange={(e) => setDeliveryMemo(e.target.value)}
                                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
                            >
                                <option value="">배송 메모를 선택해주세요.</option>
                                <option value="문 앞에 놓아주세요.">문 앞에 놓아주세요.</option>
                                <option value="직접 전달 바랍니다.">직접 전달 바랍니다.</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <img src={down} alt="다운 사진" className="w-8 h-8" />
                            </div>
                        </div>
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
                        결제 내용
                    </h2>
                    <div className="flex items-center gap-4 mb-6 border-b pb-4">
                        <img
                            src="/path/to/product-image.jpg"
                            alt="상품 이미지"
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                                [한정수량] 망나니 잔 (2024년 12월 배송)
                            </h3>
                            <p className="text-sm text-gray-500">유리컵/머그컵</p>
                            <p className="text-lg font-bold text-gray-800 mt-2">15,000원</p>
                        </div>
                    </div>
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
                    <div className="mt-8">
                        <button
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 font-semibold"
                            onClick={handlePayment}
                        >
                            결제하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductOrderComponent;