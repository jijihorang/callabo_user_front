import {ICreator} from "../../types/creator/icreator.ts";
import  axios from "axios";

const host = 'http://localhost:8080/api2/creator';

export const getCreatorList = async (customerId: string): Promise<ICreator[]> => {
    const res = await axios.get(`${host}/list`, {
        params: { customerId }, // 쿼리 파라미터로 전달
    });

    return res.data;
};