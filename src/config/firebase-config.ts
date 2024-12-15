import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 환경 변수를 상단에서 선언
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
const FIREBASE_VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

// Firebase 초기화
export const initializeFirebaseApp = () => {
    const firebaseConfig = {
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID,
        measurementId: FIREBASE_MEASUREMENT_ID,
    };

    return initializeApp(firebaseConfig);
};

// Firebase 앱 초기화
const app = initializeFirebaseApp();

// Firebase Cloud Messaging 초기화
export const initializeMessaging = () => {
    return getMessaging(app);
};

/**
 * 알림 권한 요청 및 FCM 토큰 생성
 */
export const requestFCMToken = async (): Promise<string | null> => {
    try {
        const messaging = initializeMessaging();

        console.log("Requesting notification permission...");
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.warn("Notification permission not granted.");
            alert("알림 권한이 필요합니다. 브라우저 설정에서 알림 권한을 허용해주세요.");
            return null;
        }

        console.log("Notification permission granted.");
        const token = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY });

        if (token) {
            return token;
        } else {
            console.warn("No FCM token available.");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving FCM token:", error);
        return null;
    }
};


/**
 * FCM 알림 수신 리스너
 */
export const onMessageListener = (): Promise<any> => {
    const messaging = initializeMessaging();
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
};

/**
 * FCM 토큰 페칭 함수
 */
export const fetchFCMToken = async (): Promise<string | null> => {
    const token = await requestFCMToken();
    if (token) {
        // FCM 토큰을 반환
        return token;
    } else {
        console.error("Failed to fetch FCM Token");
        return null;
    }
};

// FCM 토큰 페칭 실행 및 결과 출력
fetchFCMToken()
    .then((token) => {
        if (token) {
            // 콘솔에 토큰 출력 및 추가 작업 가능
            console.log("Use this FCM Token for testing:", token);
        } else {
            console.error("No FCM Token available.");
        }
    })
    .catch((error) => {
        console.error("An error occurred while fetching the FCM Token:", error);
    });
