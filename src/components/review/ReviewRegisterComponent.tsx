import {useState} from "react";
import {useNavigate} from "react-router-dom";

function ReviewRegisterComponent() {
    const [rating, setRating] = useState(5); // 사용자가 평가한 별점(1~5)을 관리합니다. 초기값은 4입니다.
    const [reviewText, setReviewText] = useState(""); // 사용자가 작성한 리뷰 텍스트를 관리합니다. 초기값은 빈 문자열입니다.
    const [attachments, setAttachments] = useState<File[]>([]); // 리뷰에 첨부된 사진들을 관리합니다. 초기값은 빈 배열입니다.

    const navigate = useNavigate();

    const handleAddAttachment = (e: React.ChangeEvent<HTMLInputElement>) => { // 첨부 파일을 추가하는 함수입니다.
        if (e.target.files && attachments.length < 5) { // 파일이 존재하고 첨부 파일이 5개 미만일 때만 추가할 수 있습니다.
            setAttachments([...attachments, e.target.files[0]]); // 첨부 파일 목록에 새 파일을 추가합니다.
        }
    };

    const moveToList = () => {
        navigate("/review/list")
    }

    return (
        <div className="p-4 lg:p-10"> {/* 페이지 전체 여백을 설정합니다. 작은 화면에서는 p-4, 큰 화면에서는 p-10으로 설정합니다. */}
            <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto"> {/* 리뷰 작성 폼을 감싸는 영역입니다. 배경색은 흰색이고, 그림자가 있으며 화면 중앙에 위치합니다. */}
                {/* 상품 평가 섹션 */}
                <div className="mb-6"> {/* 아래쪽 여백을 설정해줍니다. */}
                    <h2 className="text-xl font-bold">상품 평가 <span className="text-red-500">*</span></h2> {/* '상품 평가' 제목과 별표(필수 항목)를 표시합니다. */}
                    <div className="flex items-center mt-2 space-x-1"> {/* 별점 버튼들이 들어있는 영역입니다. */}
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setRating(index + 1)}
                                className={`text-2xl cursor-pointer ${
                                    index < rating ? "text-blue-700" : "text-gray-300"
                                }`}
                            >
                                ★ {/* 별 모양을 표시합니다. */}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 리뷰 작성 섹션 */}
                <div className="mb-6 mt-16"> {/* 리뷰 작성 영역에 여백을 줍니다. */}
                    <h2 className="text-xl font-bold">리뷰 작성 <span className="text-red-500">*</span></h2> {/* '리뷰 작성' 제목과 필수 표시를 추가합니다. */}
                    <p className="w-full p-5 border rounded mt-2 bg-gray-100"></p>
                    <textarea
                        rows={5}
                        placeholder="리뷰 내용을 작성해 주세요."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full p-2 mt-2 border rounded bg-gray-100"
                    />
                    <div className="text-right text-gray-500 text-sm mt-1">/{500 - reviewText.length}</div>
                </div>

                {/* 사진 첨부 */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold">사진 첨부 {attachments.length}/5</h2>
                    <p className="text-xs text-red-500">
                        상품과 무관한 사진 또는 결제 영수증을 첨부한 리뷰는 동의 없이 삭제됩니다.
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
                    <button className="bg-gray-200 text-black px-4 py-2 rounded-lg mr-3">삭제</button>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg" onClick={moveToList}>저장</button>
                </div>
            </div>
        </div>
    );
}

export default ReviewRegisterComponent;