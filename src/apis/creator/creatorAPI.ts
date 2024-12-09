import {ICreator} from "../../types/creator/icreator.ts";
import  axios from "axios";

const host = 'http://localhost:8080/api2/creator';

// 제작자 리스트
export const getCreatorList = async (): Promise<ICreator[]> => {
    const res = await axios.get(`${host}/list`);
    return res.data;
}