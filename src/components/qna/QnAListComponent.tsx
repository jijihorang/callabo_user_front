import QnAReadComponent from "./QnAReadComponent.tsx";
import { useState } from "react";
import {Link} from "react-router-dom";

function QnAListComponent() {
    const data = [
        { no: 6, title: "배송 및 반품은 어떻게 하나요?", date: "2020-11-12" },
        { no: 5, title: "부자재가 불량일 경우 어떻게 요청하나요?", date: "2017-11-22" },
        { no: 4, title: "묶음 배송을 요청하려면 어떻게 해야 하나요?", date: "2017-11-22" },
        { no: 3, title: "비밀번호를 찾으려면 어떻게 해야 하나요?", date: "2017-11-22" },
        { no: 2, title: "LINDA 쇼핑몰은 어떻게 이용할 수 있나요?", date: "2017-11-06" },
        { no: 1, title: "반품/교환 방법은 무엇인가요?", date: "2017-11-03" },
    ];

    const [selectedQuestion, setSelectedQuestion] = useState<{
        title: string;
        date: string;
        attachments: string[];
        answer: string;
    } | null>(null);

    const openModal = (question: {
        title: string;
        date: string;
        attachments: string[];
        answer: string;
    }) => {
        setSelectedQuestion(question);
    };

    const closeModal = () => {
        setSelectedQuestion(null);
    };

    return (
        <>
            <div className="container mx-auto mt-5 pb-5 px-4 lg:px-8">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold">Q&A</h1>
                </div>

                <div className="grid gap-4 lg:grid-cols-1">
                    {data.map((item) => (
                        <div
                            key={item.no}
                            className="p-4 bg-white rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center cursor-pointer"
                            onClick={() =>
                                openModal({
                                    title: item.title,
                                    date: item.date,
                                    attachments: [
                                        "https://via.placeholder.com/150",
                                        "https://via.placeholder.com/150",
                                    ],
                                    answer:
                                        "배송 요청은 마이페이지 > 주문 관리에서 가능합니다. " +
                                        "반품은 상품 수령 후 7일 이내에 고객센터를 통해 신청해 주세요.",
                                })
                            }
                        >
                            <div className="text-sm text-gray-500 font-bold mb-2 lg:mb-0">
                                No. {item.no}
                            </div>

                            <div className="flex-1 mb-2 lg:mb-0 lg:px-4">
                                <h2 className="text-lg font-bold text-gray-800 truncate">
                                    {item.title}
                                </h2>
                            </div>

                            <div className="text-sm text-gray-500">{item.date}</div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
                    >
                        <Link to={"/qna/register"}>글쓰기</Link>
                    </button>
                </div>

            </div>

            {selectedQuestion && (
                <QnAReadComponent question={selectedQuestion} closeModal={closeModal}/>
            )}
        </>
    );
}

export default QnAListComponent;
