import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import mainRouter from "./routers/mainRouter.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { requestFCMToken } from "./config/firebase-config.ts";
import NotificationPopup from "./components/personalcolor/NotificationPopup.tsx";

const queryClient = new QueryClient();

async function registerServiceWorker() {
    // Service Worker 등록
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
            console.log("Service Worker registered with scope:", registration.scope);
            return registration;
        } catch (error) {
            console.error("Service Worker registration failed:", error);
        }
    } else {
        console.error("Service Worker is not supported in this browser.");
    }
}

async function requestNotificationPermission() {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        console.log("Notification permission granted.");
    } else if (permission === "denied") {
        alert("알림 권한이 필요합니다. 브라우저 설정에서 알림 권한을 허용해주세요.");
        throw new Error("Notification permission denied");
    }
}

async function initializeFCM() {
    // 순서: Service Worker 등록 → 알림 권한 요청 → FCM 토큰 생성
    try {
        const registration = await registerServiceWorker();
        if (!registration) {
            throw new Error("Service Worker registration failed.");
        }

        await requestNotificationPermission();

        // FCM 토큰 요청
        const token = await requestFCMToken();
        console.log("FCM Token:", token);
    } catch (error) {
        console.error("Error initializing FCM:", error);
    }
}

initializeFCM(); // FCM 초기화 실행

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={mainRouter}></RouterProvider>
        <NotificationPopup />
    </QueryClientProvider>
);
