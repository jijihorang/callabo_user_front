import {IOrder} from "../../types/order/iorder.ts";
import axios from "axios";

const host = "http://localhost:8080/api2/orders";

// 주문 생성
export const createOrders = async (orders: Partial<IOrder>[]): Promise<IOrder[]> => {
    try {
        const response = await axios.post(`${host}`, orders, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data; // 생성된 주문 목록 반환
    } catch (error: any) {
        console.error("Failed to create orders:", error.message);
        throw new Error("Unable to create orders. Please try again later.");
    }
};