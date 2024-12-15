import React, { useState } from "react";
import { analyzePersonalColor } from "../../apis/openai/chatgptAPI";
import PersonalColorResult from "./PersonalColorResult";

const PersonalColorComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    // 로컬스토리지에서 사용자 정보 가져오기
    const customerName = localStorage.getItem("customerName") || "Guest";
    const customerProfileImage = localStorage.getItem("customerProfileImage");

    const handleAnalyzeColor = async () => {
        if (!customerProfileImage) {
            alert("프로필 이미지가 없습니다. 로그인을 확인해주세요.");
            return;
        }

        setLoading(true);
        try {
            const response = await analyzePersonalColor(customerProfileImage, customerName);
            console.log("분석 결과:", response);
            setResult(response); // 결과를 상태로 저장
        } catch (error) {
            console.error("퍼스널 컬러 분석 실패:", error);
            alert("분석 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-pink-300 to-white text-gray-800">
            {/* 타이틀 및 설명 */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">나에게 어울리는 컬러를 찾아라!!</h1>
                <p className="text-2xl font-semibold mb-2">AI 퍼스널 컬러 진단</p>
            </div>

            {/* 컬러 이미지와 버튼 */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="mb-6">
                    <div className="mb-6">
                        {/* 프로필 이미지 */}
                        {customerProfileImage ? (
                            <img
                                src={customerProfileImage}
                                alt={`${customerName}님의 프로필`}
                                className="w-32 h-32 rounded-full object-cover mx-auto"
                            />
                        ) : (
                            <div
                                className="flex justify-center items-center bg-gradient-to-r from-red-400 to-blue-400 w-32 h-32 rounded-full mx-auto">
                                <span className="text-5xl font-bold text-white">?</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 버튼 */}
                <button
                    onClick={handleAnalyzeColor}
                    disabled={loading}
                    className={`w-full py-3 text-white font-semibold rounded-md transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-pink-500 hover:bg-pink-600"
                    }`}
                >
                    {loading ? "분석 중..." : "분석하기"}
                </button>
            </div>

            {/* 결과 출력 */}
            {result && <PersonalColorResult result={result}/>}
        </div>
    );
};

export default PersonalColorComponent;
