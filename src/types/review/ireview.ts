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



    reviewNo: number;
    customerName: string;
    creatorName: string;
    productDescription: string;
    comment: string;
    reply: string;
}