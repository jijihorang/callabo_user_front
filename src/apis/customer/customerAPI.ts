import axios from "axios";

const host = 'http://localhost:8080/api2/customer';

// 팔로우 상태 변경
export const toggleFollow = async (customerId: string, creatorId: string): Promise<void> => {
   const res =  await axios.post(`${host}/follow`, { customerId, creatorId });
   return res.data;
};
