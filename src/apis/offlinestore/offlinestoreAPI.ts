import axios from "axios";
import {IOfflineStore} from "../../types/offlinestore/iofflinestore.ts";


export const getOfflineStoreList = async (): Promise<IOfflineStore[]> => {
    try {
        const result = await axios.get(`/api2/offlinestore/list`);
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch all offline stores:", error.message);
        throw new Error("Unable to retrieve stores. Please try again later.");
    }
};
