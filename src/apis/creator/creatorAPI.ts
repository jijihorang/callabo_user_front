import axios from "axios";
import { ICreator } from "../../types/creator/icreator";

const host = "/api2/creator";

export const getCreatorList = async (customerId: string): Promise<ICreator[]> => {
    const res = await axios.get(`${host}/list`, {
        params: { customerId },
    });
    return res.data;
};

// 제작자 팔로우 상태 변경
export const toggleFollowStatusAPI = async (
    customerId: string,
    creatorId: string
): Promise<void> => {
    try {
        await axios.post(`${host}/follow`, {
            customerId,
            creatorId,
        });
        console.log("팔로우 상태 변경 완료");
    } catch (error) {
        console.error("팔로우 상태 변경 중 오류 발생:", error);
        throw new Error("팔로우 상태 변경에 실패했습니다.");
    }
};

// 특정 고객의 제작자 팔로우 상태 확인
export const checkFollowStatusAPI = async (
    customerId: string,
    creatorId: string
): Promise<boolean> => {
    try {
        const res = await axios.get(`${host}/follow/status`, {
            params: {
                customerId,
                creatorId,
            },
        });
        console.log(`Follow Status for Creator (${creatorId}):`, res.data);
        return res.data;
    } catch (error) {
        console.error("팔로우 상태 확인 중 오류 발생:", error);
        throw new Error("팔로우 상태 확인에 실패했습니다.");
    }
};