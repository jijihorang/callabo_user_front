import {IOrder, IOrderList} from "../../types/order/iorder.ts";
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

// 로그인한 사용자의 주문 내역 조회
export const fetchOrdersByCustomer = async (customerId: string): Promise<IOrderList[]> => {
    try {
        const response = await axios.get<IOrderList[]>(`${host}/customer/${customerId}`, {
            headers: {"Content-Type": "application/json"},
        });
        return response.data; // 조회된 주문 목록 반환
    } catch (error: any) {
        console.error("Failed to fetch orders:", error.response?.data || error.message);
        throw new Error("Unable to fetch orders. Please try again later.");
    }
};