import React, { useState } from "react";
import { IQnaRequest } from "../../types/qna/iqna";
import { uploadS3Images } from "../../apis/image/imageUploadAPI";
import { addQnA } from "../../apis/qna/qnaAPI";
import useAuthStore from "../../stores/customer/AuthStore.ts";

const initialState: IQnaRequest = {
    qnaNo: 0,
    question: "",
    creatorId: "",
    productNo: 0,
    customerId: "",
    qnaImages: [],
};

function QnARegisterComponent() {
    const { customer } = useAuthStore();

    const [question, setQuestion] = useState(initialState.question);
    const [customerId] = useState(customer?.customerId || "");
    const [imageFiles, setImageFiles] = useState<(File | undefined)[]>([undefined, undefined, undefined]);
    const [previewImages, setPreviewImages] = useState<(string | undefined)[]>([undefined, undefined, undefined]);
    const [loading, setLoading] = useState(false);

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
            alert("질문을 입력해주세요.");
            return;
        }

        try {
            setLoading(true);

            // 유효한 파일만 필터링
            const validFiles = imageFiles.filter((file) => file !== undefined) as File[];

            // 이미지 업로드
            const uploadedUrls = await uploadS3Images(validFiles);
            if (!uploadedUrls || uploadedUrls.length === 0) {
                alert("이미지 업로드에 실패했습니다.");
                return;
            }

            // QnA 데이터 준비
            const qnaData: IQnaRequest = {
                ...initialState,
                question,
                customerId,
                qnaImages: uploadedUrls.map((url, index) => ({
                    qnaImageUrl: url,
                    qnaImageOrd: index,
                })),
            };

            // QnA 등록 API 호출
            await addQnA(qnaData);

            alert("QnA가 성공적으로 등록되었습니다.");
            resetForm();
        } catch (error) {
            console.error("QnA 등록 실패:", error);
            alert("QnA 등록에 실패했습니다.");
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
            <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-center">QnA 작성</h1>

                <div>
                    {customer?.customerId}
                </div>

                {/* 질문 작성 */}
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

                {/* 이미지 업로드 */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold">사진 첨부 (최대 3개)</h2>
                    <p className="text-xs text-gray-500">상품과 관련된 이미지 최대 3개까지 등록 가능합니다.</p>
                    <div className="grid grid-cols-3 gap-4">
                        {previewImages.map((image, index) => (
                            <div key={index} className="relative w-full h-32 border-2 border-dashed rounded-lg">
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

                {/* 하단 버튼 */}
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
