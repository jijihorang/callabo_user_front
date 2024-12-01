import {IProduct} from "../../types/product/product.ts";
import axios from "axios";

const host = 'http://localhost:8080/api2/product';

// 상품 리스트 (특정 제작자의 상품만 가져오기)
export const getProductList = async (creatorId: string): Promise<IProduct[]> => {
    const res = await axios.get(`${host}/list`, {
        params: { creatorId }, // 쿼리 파라미터로 전달
    });

    return res.data;
};