import {IReview} from "../review/ireview.ts";

export interface IProduct {
    productNo : number;
    productName : string;
    productDescription : string;
    productPrice : number;
    productStatus ?: string;
    creatorId? : string;

    stock ?: string;
    productImageUrl: string | null;


    productImages: IProductImage[];

    categoryName?: string;

    reviews?: IReview[]; // 해당 상품과 연결된 리뷰 리스트
}

export interface IProductList {
    productNo: number; // 상품 고유 번호
    productName: string; // 상품 이름
    productPrice: number; // 상품 가격
    productImageUrl: string | null; // 상품 이미지 URL (null 가능)
    productStatus: string; // 상품 상태 (예: '1' 등)
    productDescription?: string;
    productImages?: IProductImage[];
    likeStatus? : boolean;
}

export interface IProductImage {
    productImageNo: number;
    productImageUrl: string;
    productImageOrd: number;
}

export interface IProductRanking {
    productNo: number;
    prodcutName: string;
    creatorId: string;
    productImageUrl: string;
    productDescription: string;
    productPrice: number;
    orderCount: number;
}