import { useState, useEffect } from "react";
import { IQna } from "../../types/qna/iqna.ts";
import { getQnAList } from "../../apis/qna/qnaAPI.ts";
import { getQnaRead } from "../../apis/qna/qnaAPI.ts";
import QnAReadComponent from "./QnAReadComponent.tsx";
import useAuthStore from "../../stores/customer/AuthStore.ts";
import heart from "../../assets/icons/heart.png"
import {useNavigate} from "react-router-dom";

function QnAListComponent() {
    const { customer } = useAuthStore();
    const [data, setData] = useState<IQna[]>([]); // QnA 데이터 저장
    const [selectedQnA, setSelectedQnA] = useState<IQna | null>(null); // 선택된 QnA 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const navigate = useNavigate()

    // 모달 열기 및 QnA 데이터 로드
    const openModal = async (qnaNo: number) => {
        try {
            const qnaDetail = await getQnaRead(qnaNo); // QnA 상세 데이터 가져오기
            setSelectedQnA(qnaDetail);
            setIsModalOpen(true);
        } catch (error) {
            console.error("QnA 데이터를 가져오는 데 실패했습니다.", error);
        }
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQnA(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const qnaList = await getQnAList(customer.customerId); // QnA 목록 가져오기
                setData(qnaList);
            } catch (error) {
                console.error("QnA 목록을 가져오는 데 실패했습니다.", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="container mx-auto mt-5 pb-5 px-4 lg:px-8">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold">내 질문</h1>
                </div>

                {data.length === 0 ? (
                    // 리뷰가 없을 경우
                    <div className="flex flex-col items-center justify-center h-96">
                        <img
                            src={heart}
                            alt="질문 아이콘"
                            className="w-20 h-20 mb-6"
                        />
                        <p className="text-lg font-bold mb-2">
                            작성한 질문이 없어요
                        </p>
                        <button
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                            onClick={() => navigate(`/creator/list`)} // 상품 구경 페이지로 이동
                        >
                            상품 구경하기
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-1">
                        {data.map((item) => (
                            <div
                                key={item.qnaNo}
                                className="p-4 bg-white rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center cursor-pointer"
                                onClick={() => openModal(item.qnaNo)} // QnA 번호로 상세 데이터 가져오기
                            >
                                <div className="text-sm text-gray-500 font-bold mb-2 lg:mb-0">
                                    No. {item.qnaNo}
                                </div>

                                <div className="flex-1 mb-2 lg:mb-0 lg:px-4">
                                    <h2 className="text-lg font-bold text-gray-800 truncate">
                                        {item.question}
                                    </h2>
                                </div>

                                <div className="text-sm text-gray-500">{item.createdAt}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 모달 */}
            {isModalOpen && selectedQnA && (
                <QnAReadComponent
                    question={{
                        title: selectedQnA.question,
                        date: selectedQnA.createdAt || "날짜 없음",
                        attachments: selectedQnA.qnaImages?.map((img) => img.qnaImageUrl) || [],
                        answer: selectedQnA.answer || "답변이 없습니다.",
                    }}
                    closeModal={closeModal}
                />
            )}
        </>
    );
}

export default QnAListComponent;