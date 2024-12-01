export interface IProduct {
    productNo?: number;
    productName?: string;
    productDescription?: string;
    productPrice: string;
    productStatus?: string;

    creatorId?: string;

    categoryNo?: number;

    images?: {
        productImageNo: number;
        productImageUrl: string;
        productImageOrd: number;
    }[];
}
