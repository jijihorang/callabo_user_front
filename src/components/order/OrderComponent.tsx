import { useState } from "react";
import down from "../../assets/icons/down.png";
import { useDaumPostcodePopup } from "react-daum-postcode";
import useAuthStore from "../../stores/customer/AuthStore.ts";
import { createOrders } from "../../apis/order/orderAPI.ts";

function OrderComponent() {
    // 사용자 정보 상태 가져오기
    const { customerName, customerId } = useAuthStore();

    // 입력 상태
    const [recipientName, setRecipientName] = useState(customerName || ""); // 이름
    const [recipientPhone, setRecipientPhone] = useState(""); // 연락처
    const [postalCode, setPostalCode] = useState(""); // 우편번호
    const [address, setAddress] = useState(""); // 기본 주소
    const [addressDetail, setAddressDetail] = useState(""); // 상세 주소
    const [deliveryMemo, setDeliveryMemo] = useState(""); // 배송 메모

    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    // Daum 주소 API 호출
    const handleAddressSearch = () => {
        open({
            onComplete: (data) => {
                setPostalCode(data.zonecode);
                setAddress(data.address);
            },
        });
    };

    // 결제 버튼 클릭 이벤트
    const handlePayment = async () => {
        try {
            if (!customerId) {
                alert("로그인이 필요합니다.");
                return;
            }

            // 주문 데이터 생성
            const orderData = [
                {
                    creatorId: "creator1", // 예: 백엔드에서 필요한 경우, 실제 데이터에 맞게 수정
                    customerId, // 사용자 ID
                    recipientName: recipientName,
                    recipientPhone: recipientPhone,
                    customerAddress: address,
                    customerAddrDetail: addressDetail,
                    totalAmount: 1, // 총 수량
                    totalPrice: 18000, // 총 금액
                    items: [
                        {
                            productNo: 1, // 상품 ID
                            productName: "[한정수량] 망나니 잔 (2024년 12월 배송)",
                            quantity: 1, // 수량
                            unitPrice: 15000, // 단가
                        },
                    ],
                },
            ];

            // API 호출
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
            <div className="w-full lg:w-1/3 lg:ml-12 bg-white z-50 p-4 relative">
                <div className="sticky top-20 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-6 text-gray-800 text-center border-b-2 border-gray-400 pb-3">
                        주문 정보
                    </h2>
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

export default OrderComponent;
