export interface IReview {
    reviewNo : number;
    rating ?: number;
    comment ?: string;
    reply ?: string;
    reviewLike ?: number;

    customerName: string;

    createdAt: string;

    creatorName: string;

    productName: string;
    productPrice ?: string;

    reviewImages ?: {
        reviewImageNo: number;
        reviewImageUrl: string;
        reviewImageOrd: number;
    }[];
}


