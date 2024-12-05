import { create } from "zustand";
import { ICustomer } from "../../types/customer/icustomer.ts";

interface AuthState {
    customer: ICustomer | null;
    isLoggedIn: boolean;
    setUser: (customer: ICustomer, accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    customer: null,
    isLoggedIn: false,

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
}));

export default useAuthStore;
