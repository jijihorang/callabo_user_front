export interface IOrder {
    orderNo : number;
    recipientName : string;
    recipientPhone : string;
    customerAddress : string;
    customerAddrDetail : string;
    totalAmount: number;
    totalPrice: number;
    items: {
        productNo: number;
        productName: string;
        quantity: number;
        unitPrice: number;
    }[];
}
