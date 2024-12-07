import { create } from "zustand";

interface AuthState {
    customerName: string | null;
    customerId: string | null;
    customerProfileImage: string | null;
    accessToken: string | null;
    setUser: (name: string, email: string, profile: string, accessToken: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    customerName: sessionStorage.getItem("name") || null,
    customerId: sessionStorage.getItem("email") || null,
    customerProfileImage: sessionStorage.getItem("profile") || null,
    accessToken: sessionStorage.getItem("accessToken") || null,
    setUser: (customerName, customerId, customerProfileImage,accessToken) => {

        sessionStorage.setItem("name", customerName);
        sessionStorage.setItem("email", customerId);
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("profile",customerProfileImage)

        set({ customerName, customerId, customerProfileImage, accessToken });
    },
    logout: () => {
        sessionStorage.clear();
        set({
            customerName: null,
            customerId: null,
            customerProfileImage: null,
            accessToken: null,
        });
    },
}));


export default useAuthStore;
