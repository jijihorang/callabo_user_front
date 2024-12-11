export interface ILikedProducts {
    id: number; // 상품 고유 ID
    img: string; // 상품 이미지 URL
    name: string; // 상품 이름
    price: number; // 상품 가격

    creatorId ?: string;
}

export interface ILikedCreators {
    creatorId: string;
    profileImg: string;
    name: string;
    likes: number;
}