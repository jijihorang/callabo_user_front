import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import mainRouter from "./routers/mainRouter.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import { requestFCMToken} from "./config/firebase-config.ts";
import NotificationPopup from "./components/personalcolor/NotificationPopup.tsx";

const queryClient = new QueryClient()

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
            console.error("Service Worker registration failed:", error);
        });
}

async function requestPermission(){
    const permission = await Notification.requestPermission();

    if (permission === 'granted'){
        console.log("fcm token permission got granted")
    } else if(permission === 'denied'){
        alert("you denied for the notification")
    }
}

requestFCMToken() // FCM 토큰 요청
requestPermission()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={mainRouter}></RouterProvider>
        <NotificationPopup/>
    </QueryClientProvider>

)
