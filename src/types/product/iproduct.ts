import {ICategory} from "../category/icategory.ts";

export interface IProduct {
    productNo : number;
    productName : string;
    productDescription : string;
    productPrice : string;
    productStatus ?: string;

    stock ?: string;

    productImages ?: {
        productImageNo: number;
        productImageUrl: string;
        productImageOrd: number;
    }[];

    category ?: ICategory;
}
