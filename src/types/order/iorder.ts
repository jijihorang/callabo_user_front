export interface IOrder {
    orderNo : number;
    recipientName : string;
    recipientPhone : string;
    customerAddress : string;
    customerAddressDetail : string;
    totalAmount: number;
    totalPrice: number;
    items: {
        productNo: number;
        productName: string;
        quantity: number;
        unitPrice: number;
    }[];
}

// Order Item 인터페이스
export interface IOrderItem {
    productNo: number;          // 상품 번호
    productName: string;        // 상품 이름
    productImage: string;       // 상품 이미지
    unitPrice: number;          // 단위 가격
    quantity: number;           // 수량
}

// Order 인터페이스
export interface IOrderList {
    orderNo: number;            // 주문 번호
    orderDate: string;          // 주문 날짜
    creatorId: string;
    creatorName: string;        // 제작자 이름
    customerName: string;       // 고객 이름
    totalAmount: number;        // 총 수량
    totalPrice: number;         // 총 금액
    status: string;             // 주문 상태 (ENUM 값)
    items: IOrderItem[];        // 주문 상품 목록
}