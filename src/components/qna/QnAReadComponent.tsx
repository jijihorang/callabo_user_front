function QnAReadComponent({question, closeModal,}: {
    question: {
        title: string;
        date: string;
        attachments: string[];
        answer: string;
    };
    closeModal: () => void;
}) {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="p-6 bg-white rounded-lg w-11/12 max-w-3xl relative shadow-lg">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    onClick={closeModal}
                >
                    ✕
                </button>

                {/* 제목과 날짜 */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800">제목 : {question.title}</h2>
                    <p className="text-sm text-gray-500">{question.date}</p>
                </div>

                {/* 첨부 파일 */}
                <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">첨부 파일</h3>
                    <div className="flex space-x-2">
                        {question.attachments.map((attachment, index) => (
                            <img
                                key={index}
                                src={attachment}
                                alt={`첨부 파일 ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg border"
                            />
                        ))}
                    </div>
                </div>

                {/* 답변 */}
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                    <h3 className="text-sm font-bold text-blue-600 mb-2">답변</h3>
                    <p className="text-gray-800">{question.answer}</p>
                </div>
            </div>
        </div>
    );
}

export default QnAReadComponent;
