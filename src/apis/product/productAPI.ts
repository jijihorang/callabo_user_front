import {IProduct, IProductList} from "../../types/product/iproduct.ts";
import axios from "axios";

const host = 'http://localhost:8080/api2/product';

// 상품 리스트 (특정 제작자의 상품만 가져오기)
export const getProductList = async (creatorId: string): Promise<IProductList[]> => {
    const res = await axios.get(`${host}/list`, {
        params: { creatorId }, // 쿼리 파라미터로 전달
    });

    console.log(res)

    return res.data;
};

// 상품 조회
export const getProductRead = async (productNo : number) : Promise<IProduct> => {
    const res = await axios.get(`${host}/detail/${productNo}`);
    return res.data;
}