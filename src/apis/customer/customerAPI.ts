import axios from "axios";
import {IWishlistProduct} from "../../types/wishlist/iwishlist.ts";

const host = 'http://localhost:8080/api2';

// 팔로우 상태 변경
export const toggleFollow = async (customerId: string, creatorId: string): Promise<void> => {
   const res =  await axios.post(`${host}/customer/follow`, { customerId, creatorId });
   return res.data;
};

export const getLikedProducts = async (customerId: string): Promise<IWishlistProduct[]> => {
   try {
      console.log("API 호출 URL:", `${host}/product/like`);
      console.log("요청 파라미터:", { customerId });

      const response = await axios.get(`${host}/product/like`, {
         params: { customerId },
      });

      console.log("API 응답 데이터:", response.data);
      return response.data;
   } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
      throw error; // 에러를 다시 던져 React Query에서 처리
   }
};