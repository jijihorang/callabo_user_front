import axios from "axios";
import { UpdateCustomerDTO} from "../../types/customer/icustomer.ts";

const host = 'http://localhost:8080/api2/customer';

// 팔로우 상태 변경
export const toggleFollow = async (customerId: string, creatorId: string): Promise<void> => {
   const res =  await axios.post(`${host}/follow`, { customerId, creatorId });
   return res.data;
};


export const updateCustomer = async (
    customerId: string,
    customerData: UpdateCustomerDTO ): Promise<void> => {
   try {
      const res = await axios.put(`${host}/${customerId}`, customerData);
      return res.data;
   } catch (error) {
      console.error("사용자 정보 업데이트 중 오류 발생:", error);
      throw error;
   }
};