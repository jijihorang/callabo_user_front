
export interface IProduct {
    productNo : number;
    productName : string;
    productDescription : number;
    productPrice : string;
    productStatus ?: string;

    stock ?: string;

    productImages ?: {
        productImageNo: number;
        productImageUrl: string;
        productImageOrd: number;
    }[];

    categoryName?: string;
}
