import { create } from "zustand";
import { ICustomer } from "../../types/customer/icustomer.ts";

// 쿠키 값을 가져오는 유틸리티 함수
const getCookieValue = (cookieName: string): string | null => {
    const cookies = document.cookie.split("; ").reduce((acc: Record<string, string>, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {});
    return cookies[cookieName] || null;
};

interface AuthState {
    customer: ICustomer | null;
    isLoggedIn: boolean;
    setUser: (
        customer: ICustomer,
        accessToken: string,
        refreshToken: string,
    ) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
    // 쿠키에서 customerId와 토큰 값 읽기
    const customerId = getCookieValue("customerId");
    const customerName = localStorage.getItem("customerName");
    const customerProfileImage = localStorage.getItem("customerProfileImage");

    const customer = customerId
        ? {
            customerId,
            customerName: customerName || "",
            customerProfileImage: customerProfileImage || "",
        }
        : null;

    return {
        customer,
        isLoggedIn: !!customerId,
        setUser: (customer, accessToken, refreshToken) => {
            // 쿠키에 저장
            document.cookie = `accessToken=${accessToken}; path=/; secure; SameSite=Strict;`;
            document.cookie = `refreshToken=${refreshToken}; path=/; secure; SameSite=Strict;`;
            document.cookie = `customerId=${customer.customerId}; path=/; secure; SameSite=Strict;`;

            // LocalStorage 저장
            localStorage.setItem("customerName", customer.customerName);
            localStorage.setItem("customerProfileImage", customer.customerProfileImage || "");

            set({
                customer,
                isLoggedIn: true,
            });
        },
        logout: () => {
            // 쿠키 초기화
            document.cookie = "accessToken=; path=/; max-age=0;";
            document.cookie = "refreshToken=; path=/; max-age=0;";
            document.cookie = "customerId=; path=/; max-age=0;";

            // LocalStorage 초기화
            localStorage.removeItem("customerName");
            localStorage.removeItem("customerProfileImage");

            set({
                customer: null,
                isLoggedIn: false,
            });
        },
    };
});

export default useAuthStore;
