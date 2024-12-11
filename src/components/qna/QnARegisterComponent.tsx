import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import { IQnaRequest } from "../../types/qna/iqna";
import { uploadS3Images } from "../../apis/image/imageUploadAPI";
import { addQnA } from "../../apis/qna/qnaAPI";
import useAuthStore from "../../stores/customer/AuthStore.ts";
import {SweetAlertOptions} from "sweetalert2";
import AlertComponent from "../common/AlertComponent.tsx";

const initialState: IQnaRequest = {
    qnaNo: 0,
    question: "",
    creatorId: "",
    productNo: 0,
    customerId: "",
    qnaImages: [],
};

function QnARegisterComponent() {
    const location = useLocation();
    const { state } = location as { state: { productNo: number; creatorId: string; customerId: string } };
    const { productNo, creatorId, customerId } = state;
    const { customer } = useAuthStore();

    const [question, setQuestion] = useState(initialState.question);
    const [imageFiles, setImageFiles] = useState<(File | undefined)[]>([undefined, undefined, undefined]);
    const [previewImages, setPreviewImages] = useState<(string | undefined)[]>([undefined, undefined, undefined]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [alertOptions, setAlertOptions] = useState<SweetAlertOptions | null>(null);

    const handleImageUpload = (file: File, index: number) => {
        const reader = new FileReader();
        reader.onload = () => {
            const updatedPreviewImages = [...previewImages];
            const updatedImageFiles = [...imageFiles];

            updatedPreviewImages[index] = reader.result as string; // 미리보기 URL
            updatedImageFiles[index] = file; // 파일 저장

            setPreviewImages(updatedPreviewImages);
            setImageFiles(updatedImageFiles);
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = (index: number) => {
        const updatedPreviewImages = [...previewImages];
        const updatedImageFiles = [...imageFiles];

        updatedPreviewImages[index] = undefined; // 미리보기 삭제
        updatedImageFiles[index] = undefined; // 파일 삭제

        setPreviewImages(updatedPreviewImages);
        setImageFiles(updatedImageFiles);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!question.trim()) {
            setAlertOptions({
                title: "질문을 입력해주세요.",
                icon: "warning",
                confirmButtonText: "확인",
            });
            return;
        }

        try {
            setLoading(true);

            // 유효한 파일만 필터링
            const validFiles = imageFiles.filter((file) => file !== undefined) as File[];

            // 이미지 업로드
            const uploadedUrls = await uploadS3Images(validFiles);
            if (!uploadedUrls || uploadedUrls.length === 0) {
                setAlertOptions({
                    title: "이미지 업로드 실패",
                    icon: "error",
                    confirmButtonText: "확인",
                });
                return;
            }

            // QnA 데이터 준비
            const qnaData: IQnaRequest = {
                qnaNo: 0,
                question,
                creatorId,
                customerId,
                productNo,
                qnaImages: uploadedUrls.map((url, index) => ({
                    qnaImageUrl: url,
                    qnaImageOrd: index,
                })),
            };

            console.log("qnaData", qnaData);

            // QnA 등록 API 호출
            await addQnA(qnaData);
            navigate("/order/list")
            setAlertOptions({
                title: "QnA 등록 성공",
                icon: "success",
                confirmButtonText: "확인",
            });

            resetForm();
        } catch (error) {
            console.error("QnA 등록 실패:", error);
            setAlertOptions({
                title: "QnA 등록 실페",
                icon: "error",
                confirmButtonText: "확인",
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setQuestion(initialState.question);
        setPreviewImages(Array(3).fill(undefined));
        setImageFiles(Array(3).fill(undefined));
    };

    return (
        <div className="container mx-auto mt-5 pb-5 px-4 lg:px-8">

            {alertOptions && (
                <AlertComponent
                    options={alertOptions}
                    onClose={() => setAlertOptions(null)} // 알림 닫힐 때 초기화
                />
            )}

            <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">QnA 작성</h1>

                <div className="flex flex-col space-y-1 mb-2">
                    <label className="text-sm font-medium text-gray-700">상품 번호</label>
                    <div
                        className="w-full p-3 border rounded bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
                        <span>{productNo}</span>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 mb-2">
                    <label className="text-sm font-medium text-gray-700">제작자명</label>
                    <div
                        className="w-full p-3 border rounded bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
                        <span>{creatorId}</span>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 mb-2">
                    <label className="text-sm font-medium text-gray-700">사용자명</label>
                    <div
                        className="w-full p-3 border rounded bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
                        <span>{customer?.customerName}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <textarea
                        rows={5}
                        placeholder="QnA 내용을 작성해주세요."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-2 mt-2 border rounded bg-gray-100"
                    />
                    <div className="text-right text-gray-500 text-sm mt-1">{question.length}/500</div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">사진 첨부 (최대 3개)</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {previewImages.map((image, index) => (
                            <div key={index} className="relative w-full h-32 border-4 border-dashed rounded-lg">
                                {image ? (
                                    <>
                                        <img
                                            src={image}
                                            alt={`첨부 이미지 ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleImageDelete(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                                        >
                                            X
                                        </button>
                                    </>
                                ) : (
                                    <label
                                        htmlFor={`file-input-${index}`}
                                        className="flex items-center justify-center w-full h-full cursor-pointer text-gray-400"
                                    >
                                        <span className="text-sm">{index + 1}</span>
                                        <input
                                            id={`file-input-${index}`}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) =>
                                                e.target.files && handleImageUpload(e.target.files[0], index)
                                            }
                                        />
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        className="bg-gray-200 text-black px-4 py-2 rounded-lg mr-3"
                        onClick={resetForm}
                        disabled={loading}
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "등록 중..." : "등록"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QnARegisterComponent;
