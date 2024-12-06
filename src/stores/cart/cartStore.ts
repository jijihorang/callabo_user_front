import { create } from "zustand";

interface Product {
    id: number;
    img: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
    creatorId: string; // 추가: 상품에 creatorId 포함
}

interface CartGroup {
    groupName: string; // Optional for better labeling
    creatorId: string; // 추가: 그룹을 creatorId로 분류
    products: Product[];
    shippingFee: number;
}

interface CartState {
    cartGroups: CartGroup[];
    addToCart: (product: Product) => void;
    increaseQuantity: (groupIndex: number, productIndex: number) => void;
    decreaseQuantity: (groupIndex: number, productIndex: number) => void;
    removeProduct: (groupIndex: number, productIndex: number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
    cartGroups: [], // 초기 상태
    addToCart: (product) =>
        set((state) => {
            const groupIndex = state.cartGroups.findIndex(
                (group) => group.creatorId === product.creatorId // creatorId로 그룹 찾기
            );

            if (groupIndex !== -1) {
                // 그룹이 이미 존재할 경우
                const productIndex = state.cartGroups[groupIndex].products.findIndex(
                    (p) => p.id === product.id
                );

                if (productIndex !== -1) {
                    // 상품이 이미 존재할 경우 수량 증가
                    const newCartGroups = [...state.cartGroups];
                    newCartGroups[groupIndex].products[productIndex].quantity += product.quantity;
                    return { cartGroups: newCartGroups };
                }

                // 그룹에 새로운 상품 추가
                const newCartGroups = [...state.cartGroups];
                newCartGroups[groupIndex].products.push({ ...product, quantity: product.quantity });
                return { cartGroups: newCartGroups };
            }

            // 새로운 그룹 생성
            return {
                cartGroups: [
                    ...state.cartGroups,
                    {
                        groupName: `Creator ${product.creatorId}`, // Optional group name
                        creatorId: product.creatorId, // 그룹의 creatorId 설정
                        products: [{ ...product, quantity: product.quantity }],
                        shippingFee: 0, // 기본 배송비 설정 (필요 시 수정 가능)
                    },
                ],
            };
        }),
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

            // 그룹에서 모든 상품이 제거되었을 경우 그룹 삭제
            if (newCartGroups[groupIndex].products.length === 0) {
                newCartGroups.splice(groupIndex, 1);
            }

            return { cartGroups: newCartGroups };
        }),
    clearCart: () => set({ cartGroups: [] }),
}));

export default useCartStore;
