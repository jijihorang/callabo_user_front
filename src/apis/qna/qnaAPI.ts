import axios from "axios";
import {IQna, IQnaRequest} from "../../types/qna/iqna.ts";

const host = "http://localhost:8080/api2/qna";

export const addQnA = async ( qnaData : IQnaRequest): Promise<void> => {
    try {
        // QnARegisterDTO 매핑되는 요청 데이터
        const result = await axios.post(`${host}/register`, qnaData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.status !== 200) {
            throw new Error("Failed to add product");
        }
    } catch (error) {
        console.error("QnA 등록 실패:", error);
        throw new Error("Unable to add QnA. Please try again later.");
    }
};

export const qnaImageUpload = async (
    qnaNo: number,
    imageDTOs: { qnaImageUrl: string; qnaImageOrd: number }[]
): Promise<{ qnaImageUrl: string; qnaImageOrd: number }[]> => {
    try {
        const result = await axios.post<{ qnaImageUrl: string; qnaImageOrd: number }[]>(
            `${host}/qna/images`,
            imageDTOs,
            {
                params: { qnaNo },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (result.status !== 200) {
            throw new Error("Failed to upload QnA images");
        }

        return result.data;
    } catch (error) {
        if (error) {
            console.error("Axios Error:", error);
        } else {
            console.error("Unexpected Error:", error);
        }
        throw new Error("An error occurred while uploading the QnA images.");
    }
};

// qna 리스트
export const getQnAList = async (customerId: string): Promise<IQna[]> => {
    try {
        const res = await axios.get(`${host}/customer`, {
            params: { customerId }, // customerId를 쿼리 파라미터로 전달
        });
        return res.data;
    } catch (error) {
        console.error("QnA 목록을 가져오는 데 실패했습니다:", error);
        throw new Error("Unable to fetch QnA list. Please try again later.");
    }
};


// qna 조회
export const getQnaRead = async (qnaNo: number): Promise<IQna> => {
    const res = await axios.get(`${host}/read/${qnaNo}`);
    return res.data;
}