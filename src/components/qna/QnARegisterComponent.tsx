import {useState} from "react";
import {useNavigate} from "react-router-dom";


function ReviewRegisterComponent() {
    const [reviewText, setReviewText] = useState(""); // 리뷰 내용을 상태로 관리합니다.
    const [attachments, setAttachments] = useState<File[]>([]);// 첨부된 이미지를 상태로 관리합니다.

    const navigate = useNavigate();

    const handleAddAttachment = (event:any) => {
        if (attachments.length >= 5) {
            alert("최대 5개의 이미지만 첨부할 수 있습니다.");
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setAttachments([...attachments, file]);
        }
    };

    const handleCancel = () => {
        navigate("/qna/list"); // "/qna/list" 경로로 이동
    };

    return (
        <div className="container mx-auto mt-5 pb-5 px-4 lg:px-8">
            <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-center">리뷰 작성</h1>
                <p className="text-sm text-gray-500 mb-8 text-center">리뷰를 통해 다른 고객에게 도움을 주세요.</p>

                {/* 리뷰 작성 섹션 */}
                <div className="mb-6">
                    <textarea
                        rows={5}
                        placeholder="리뷰 내용을 작성해주세요."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full p-2 mt-2 border rounded bg-gray-100"
                    />
                    <div className="text-right text-gray-500 text-sm mt-1">{reviewText.length}/500</div>
                </div>

                {/* 사진 첨부 */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold">사진 첨부 {attachments.length}/3</h2>
                    <p className="text-xs text-gray-500">
                        상품과 관련된 이미지 최대 3개까지 등록 가능합니다.
                    </p>
                    <div className="mt-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAddAttachment}
                            className="border border-dashed border-gray-300 rounded-lg p-4 w-full cursor-pointer"
                        />
                        <div className="mt-2 flex space-x-2">
                            {attachments.map((file, index) => (
                                <div key={index} className="w-24 h-24 border rounded-lg overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`첨부 이미지 ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="flex justify-center mt-8">
                    <button className="bg-gray-200 text-black px-4 py-2 rounded-lg mr-3" onClick={handleCancel}>취소</button>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">등록</button>
                </div>
            </div>
        </div>
    );
}

export default ReviewRegisterComponent;
