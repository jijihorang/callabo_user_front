import {IProduct, IProductList, IProductRanking} from "../../types/product/iproduct.ts";
import axios from "axios";

const host = '/api2/product';

// 상품 리스트 (특정 제작자의 상품만 가져오기)
export const getProductList = async (creatorId: string): Promise<IProductList[]> => {
    const res = await axios.get(`${host}/list`, {
        params: { creatorId }, // 쿼리 파라미터로 전달
    });

    return res.data;
};


// 상품 조회
export const getProductRead = async (creatorId : string, productNo : number) : Promise<IProduct> => {
    const res = await axios.get(`${host}/${creatorId}/detail/${productNo}`);
    return res.data;
}

// 주문이 많은 상품 상위 10개 가져오기
export const getTopOrderedProducts = async (): Promise<IProductRanking[]> => {
    const res = await axios.get(`${host}/ranking`);
    return res.data;
};