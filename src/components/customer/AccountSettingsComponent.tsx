import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

import useAuthStore from "../../stores/customer/AuthStore.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AccountSettingsPage() {

    const { customer } = useAuthStore();

    const [phone, setPhone] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

    const navigate = useNavigate();

    const scriptUrl =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const handleAddressSelect = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setZipcode(data.zonecode);
        setAddress(fullAddress);
    };

    const handleClick = () => {
        open({ onComplete: handleAddressSelect });
    };

    const handleClose = () => {
        navigate("/header/user");
    }

    const handleSave = async () => {
        const payload = {
            customerPhone: phone,
            customerZipcode: zipcode,
            customerAddr: address,
            customerAddrDetail: detailAddress,
        }
        try {
            // API 호출
            await axios.put(
                `http://localhost:8080/api2/customer/${customer?.customerId}`,
                payload
            );
            alert("저장되었습니다.");
        } catch (error) {
            console.error("저장 중 오류:", error);
            alert("저장에 실패했습니다.");
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">계정 설정</h1>
            <form className="space-y-8">
                <div className="flex justify-center">
                    <div className="relative">
                        <img
                            src={customer?.customerProfileImage}
                            alt="프로필"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full"
                        />
                    </div>
                </div>

                {/* 이메일 */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        이메일(아이디) <span className="text-blue-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                        <input
                            type="email"
                            value={customer?.customerId}
                            className="flex-1 border rounded-lg px-4 py-2 text-sm"
                            disabled
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">해당 이메일로 주문 내역 메일이 전송됩니다.</p>
                </div>

                {/* 닉네임 */}
                <div>
                    <label className="block text-sm font-medium mb-1">이름</label>
                    <input
                        type="text"
                        value={customer?.customerName}
                        className="w-full border rounded-lg px-4 py-2 text-sm"
                        disabled
                    />
                    {/*<p className="text-sm text-green-500 mt-2">✔️ 특수문자 불가 ✔️ 자음/모음 단독 사용 불가</p>*/}
                </div>

                {/* 연락처 */}
                <div>
                    <label className="block text-sm font-medium mb-1">연락처</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="하이픈(-) 없이 숫자만 입력해주세요."
                        className="w-full border rounded-lg px-4 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">기본 배송지</label>
                    <div className="space-y-2">
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                value={zipcode}
                                placeholder="우편번호"
                                className="flex-1 border rounded-lg px-4 py-2 text-sm"
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={handleClick}
                                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                            >
                                주소 검색
                            </button>
                        </div>
                        <input
                            type="text"
                            value={address}
                            placeholder="주소"
                            className="w-full border rounded-lg px-4 py-2 text-sm"
                            readOnly
                        />
                        <input
                            type="text"
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                            placeholder="상세 주소"
                            className="w-full border rounded-lg px-4 py-2 text-sm"
                        />
                    </div>
                </div>

                {/* 버튼 */}
                <div className="flex justify-center mt-8 gap-3">
                    <button
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-sm rounded-lg hover:bg-gray-300"
                        onClick={handleClose}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="px-6 py-3 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        저장하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AccountSettingsPage;
