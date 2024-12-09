import {IProductImage} from "../product/iproduct.ts";

export interface IReviewImage {
    reviewImageNo: number;
    reviewImageUrl: string;
    reviewImageOrd: number;
}

export interface IReview {
    reviewImages: IReviewImage[];
    rating: number;
    productName: string;
    createdAt: string;

    productPrice: number;

    productImageUrl?: string;
    productImages: IProductImage[];

    reviewNo: number;

    customerName: string;
    creatorName: string;
    productDescription: string;
    comment: string;
    reply: string;
}