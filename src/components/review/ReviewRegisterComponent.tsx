import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addReview } from "../../apis/review/reviewAPI";
import { uploadS3Images } from "../../apis/image/imageUploadAPI";
import { IReviewRequest } from "../../types/review/ireview";
import useAuthStore from "../../stores/customer/AuthStore.ts";

function ReviewRegisterComponent() {
    const { customer } = useAuthStore(); // 로그인된 사용자 정보 가져오기
    const location = useLocation();
    const { state } = location as {
        state: { productNo: number; creatorId: string; productName: string };
    };
    const { productNo, creatorId, productName } = state;

    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [imageFiles, setImageFiles] = useState<(File | undefined)[]>([undefined, undefined, undefined]);
    const [previewImages, setPreviewImages] = useState<(string | undefined)[]>([undefined, undefined, undefined]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleImageUpload = (file: File, index: number) => {
        const reader = new FileReader();
        reader.onload = () => {
            const updatedPreviewImages = [...previewImages];
            const updatedImageFiles = [...imageFiles];

            updatedPreviewImages[index] = reader.result as string;
            updatedImageFiles[index] = file;

            setPreviewImages(updatedPreviewImages);
            setImageFiles(updatedImageFiles);
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = (index: number) => {
        const updatedPreviewImages = [...previewImages];
        const updatedImageFiles = [...imageFiles];

        updatedPreviewImages[index] = undefined;
        updatedImageFiles[index] = undefined;

        setPreviewImages(updatedPreviewImages);
        setImageFiles(updatedImageFiles);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!reviewText.trim()) {
            alert("리뷰를 작성해주세요.");
            return;
        }

        if (!customer?.customerId) {
            alert("로그인 정보가 없습니다.");
            return;
        }

        try {
            setLoading(true);

            // 유효한 파일만 필터링
            const validFiles = imageFiles.filter((file) => file !== undefined) as File[];

            // 이미지 업로드
            const uploadedUrls = await uploadS3Images(validFiles);

            // 리뷰 데이터 준비
            const reviewData: IReviewRequest = {
                reviewNo: 0,
                comment: reviewText,
                creatorId,
                customerId: customer.customerId, // AuthStore에서 가져온 customerId 사용
                productNo,
                rating,
                reviewImages: uploadedUrls.map((url, index) => ({
                    reviewImageNo: index + 1,
                    reviewImageUrl: url,
                    reviewImageOrd: index,
                })),
            };

            // 데이터 확인
            console.log("reviewData:", reviewData);

            // 리뷰 등록 API 호출
            await addReview(reviewData);
            alert("리뷰가 성공적으로 등록되었습니다.");
            navigate("/review/list");
        } catch (error) {
            console.error("리뷰 등록 실패:", error);
            alert("리뷰 등록에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 lg:p-10">
            <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">리뷰 작성</h2>

                {/* 상품 정보 */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold">상품 이름</h3>
                    <p className="p-3 bg-gray-100 border rounded">{productName}</p>
                </div>

                {/* 별점 */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold">상품 평가 <span className="text-red-500">*</span></h2>
                    <div className="flex items-center mt-2 space-x-1">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setRating(index + 1)}
                                className={`text-2xl cursor-pointer ${
                                    index < rating ? "text-blue-700" : "text-gray-300"
                                }`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                {/* 리뷰 텍스트 */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold">리뷰 작성 <span className="text-red-500">*</span></h2>
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

                {/* 등록 버튼 */}
                <div className="flex justify-center mt-8">
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

export default ReviewRegisterComponent;
