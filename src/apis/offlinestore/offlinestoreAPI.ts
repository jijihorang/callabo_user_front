import {IOfflineStore} from "../../types/creator/icreator.ts";
import axios from "axios";

const host = "http://localhost:8080/api2/offlinestore";

export const getOfflineStoreList = async (): Promise<IOfflineStore[]> => {
    try {
        const result = await axios.get(`${host}/list`);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch all offline stores:", error.message);
        throw new Error("Unable to retrieve stores. Please try again later.");
    }
};
