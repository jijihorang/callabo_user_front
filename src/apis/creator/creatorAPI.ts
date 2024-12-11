import axios from "axios";
import { ICreator } from "../../types/creator/icreator";

const host = "/api2/creator";

export const getCreatorList = async (customerId: string): Promise<ICreator[]> => {
    const res = await axios.get(`${host}/list`, {
        params: { customerId },
    });
    return res.data;
};

export const toggleFollowStatusAPI = async (
    customerId: string,
    creatorId: string,
    followStatus: boolean
): Promise<void> => {
    await axios.post(`${host}/follow`, {
        customerId,
        creatorId,
        followStatus,
    });
};
