
export interface IProduct {
    productNo : number;
    productName : string;
    productDescription : number;
    productPrice : number;
    productStatus ?: string;

    stock ?: string;

    productImages ?: {
        productImageNo: number;
        productImageUrl: string;
        productImageOrd: number;
    }[];

    categoryName?: string;
}
