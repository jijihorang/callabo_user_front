import axios from "axios";
import { ICreator } from "../../types/creator/icreator";

export const getCreatorList = async (): Promise<ICreator[]> => {
    try {
        console.log("[API 요청]: /api2/creator/list"); // 요청 URL 로그
        const res = await axios.get("/api2/creator/list");
        console.log("[API 응답]:", res.data); // 응답 데이터 로그
        return res.data;
    } catch (error) {
        console.error("[API 요청 에러]:", error);
        throw error;
    }
};

// 제작자 팔로우 상태 변경
export const toggleFollowStatusAPI = async (
    customerId: string,
    creatorId: string
): Promise<void> => {
    try {
        await axios.post(`/api2/creator/follow`, {
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
        const res = await axios.get(`/api2/creator/follow/status`, {
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