import axios from "axios";
import {IReview, IReviewRequest} from "../../types/review/ireview.ts";

export const addReview = async ( reviewData: IReviewRequest ): Promise<void> => {
    try {
        const result = await axios.post(`/api2/review/register`, reviewData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (result.status !== 200) {
            throw new Error("Failed to add review");
        }
    } catch (error) {
        console.error("Review 등록 실패: ", error);
        throw new Error("Unable to add review");
    }
};

export const getReviewList = async (creatorId?: string, productNo?: number): Promise<IReview[]> => {
    const res = await axios.get(`/api2/review/list`, {
        params: { creatorId, productNo },
    });
    return res.data;
};

export const getMyReviews = async (customerId: string): Promise<IReview[]> => {
    try {
        const res = await axios.get(`/api2/review/customer`, {
            params: { customerId },
        });
        return res.data;
    } catch (error) {
        console.error("내가 쓴 리뷰 조회 실패: ", error);
        throw new Error("Unable to fetch my reviews");
    }
};