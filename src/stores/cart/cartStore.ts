import { create } from "zustand";
import mangnani from "../../assets/img/mangnani.png";
import soju from "../../assets/img/soju.png";
import roulette from "../../assets/img/roulette.png";

interface Product {
    id: number;
    img: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

interface CartGroup {
    groupName: string;
    products: Product[];
    shippingFee: number;
}

interface CartState {
    cartGroups: CartGroup[];
    increaseQuantity: (groupIndex: number, productIndex: number) => void;
    decreaseQuantity: (groupIndex: number, productIndex: number) => void;
    removeProduct: (groupIndex: number, productIndex: number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
    cartGroups: [
        {
            groupName: "차린건쥐뿔도없지만",
            products: [
                {
                    id: 1,
                    img: mangnani,
                    name: "[포카 증정] 차쥐뿔 추천 구성 맥주잔+차쥐뿔 병따개 SET",
                    price: 21000,
                    category: "유리컵/머그컵",
                    quantity: 1,
                },
                {
                    id: 2,
                    img: soju,
                    name: "[한정수량] 망나니 잔 (2024년 12월 배송)",
                    price: 15000,
                    category: "유리컵/머그컵",
                    quantity: 1,
                },
            ],
            shippingFee: 3000,
        },
        {
            groupName: "싸이코드 감자에",
            products: [
                {
                    id: 3,
                    img: roulette,
                    name: "오니제이 포토카드",
                    price: 7500,
                    category: "세로포토카드",
                    quantity: 1,
                },
            ],
            shippingFee: 0,
        },
    ],
    increaseQuantity: (groupIndex, productIndex) =>
        set((state) => {
            const newCartGroups = [...state.cartGroups];
            newCartGroups[groupIndex].products[productIndex].quantity += 1;
            return { cartGroups: newCartGroups };
        }),
    decreaseQuantity: (groupIndex, productIndex) =>
        set((state) => {
            const newCartGroups = [...state.cartGroups];
            const product = newCartGroups[groupIndex].products[productIndex];
            if (product.quantity > 1) {
                product.quantity -= 1;
            }
            return { cartGroups: newCartGroups };
        }),
    removeProduct: (groupIndex, productIndex) =>
        set((state) => {
            const newCartGroups = [...state.cartGroups];
            newCartGroups[groupIndex].products.splice(productIndex, 1);
            return { cartGroups: newCartGroups };
        }),
    clearCart: () => set({ cartGroups: [] }),
}));

export default useCartStore;
