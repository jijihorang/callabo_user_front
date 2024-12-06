import axios from "axios";
import {IReview} from "../../types/review/ireview.ts";

const host = "http://localhost:8080/api2/review";

export const getReviewList = async (creatorId?: string): Promise<IReview[]> => {

    const res = await axios.get(`${host}/list`, {
        params: { creatorId },
    });

    return res.data;
};
