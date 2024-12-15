import axios from "axios";
import {ILikedCreators, ILikedProducts} from "../../types/wishlist/iwishlist.ts";

export const getLikedProducts = async (customerId: string): Promise<ILikedProducts[]> => {
   const response = await axios.get(`/api2/customer/likedproducts`, {
      params: { customerId },
   });

   console.log("API 응답 데이터:", response.data);

   const mappedData = response.data.map((item: any) => ({
      id: item.productId,
      name: item.productName,
      img: item.productImageUrl || 'default-product-image-url', // 이미지가 null인 경우 빈 문자열로 대체
      price: item.productPrice ?? 0,  // price가 undefined인 경우 기본값 설정
   }));

   console.log("매핑된 데이터:", mappedData);
   return mappedData;
};

export const getLikedCreators = async (customerId: string): Promise<ILikedCreators[]> => {
   const response = await axios.get(`/api2/customer/likedcreators`, {
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

export const toggleProductLikeAPI = async (
    customerId: string,
    productId: string
): Promise<void> => {
    await axios.post(`/api2/customer/like`, {
        customerId,
        productId,
    });
};

export const checkProductLikeStatusAPI = async (
    customerId: string,
    productId: string
): Promise<boolean> => {
    try {
        const response = await axios.get(`/api2/customer/like/status`, {
            params: {
                customerId,
                productId,
            },
        });
        return response.data;
    } catch (error) {
        console.error("좋아요 상태 확인 중 오류 발생:", error);
        throw new Error("좋아요 상태 확인에 실패했습니다.");
    }
};
