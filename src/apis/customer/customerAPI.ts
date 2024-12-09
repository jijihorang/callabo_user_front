import axios from "axios";
import {ILikedCreators, ILikedProducts} from "../../types/wishlist/iwishlist.ts";
import { UpdateCustomerDTO} from "../../types/customer/icustomer.ts";

const host = 'http://localhost:8080/api2/customer';

// 팔로우 상태 변경
export const toggleFollow = async (customerId: string, creatorId: string): Promise<void> => {
   const res =  await axios.post(`${host}/follow`, { customerId, creatorId });
   return res.data;
};

export const getLikedProducts = async (customerId: string): Promise<ILikedProducts[]> => {
   const response = await axios.get(`${host}/likedproducts`, {
      params: { customerId },
   });

   console.log("API 응답 데이터:", response.data);

   const mappedData = response.data.map((item: any) => ({
      id: item.productId,
      name: item.productName,
      img: item.productImageUrl || '', // 이미지가 null인 경우 빈 문자열로 대체
      price: item.productPrice ?? 0,  // price가 undefined인 경우 기본값 0 설정
   }));

   console.log("매핑된 데이터:", mappedData);
   return mappedData;
};

export const getLikedCreators = async (customerId: string): Promise<ILikedCreators[]> => {
   const response = await axios.get(`${host}/likedcreators`, {
      params: { customerId },
   });

   console.log("API 응답 데이터:", response.data);

   const mappedData = response.data.map((item: any) => ({
      creatorId: item.creatorId,
      profileImg: item.profileImg || 'default-profile-image-url', // 프로필 이미지가 null일 경우 기본 이미지 사용
      name: item.name,
      likes: item.likes ?? 0,
   }));

   console.log("매핑된 데이터:", mappedData);
   return mappedData;
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

export const toggleProductLikeAPI = async (
    customerId: string,
    productId: string,
    likeStatus: boolean
): Promise<void> => {
    await axios.post(`${host}/like`, {
        customerId,
        productId,
        likeStatus,
    });
};