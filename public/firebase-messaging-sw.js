importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js");

const messaging = firebase.messaging();

firebase.initializeApp({
    apiKey: "AIzaSyAMM5mIJ-k4F4DAbQwksCWrgg94djk4rMI",
    authDomain: "collabo-fcm.firebaseapp.com",
    projectId: "collabo-fcm",
    storageBucket: "collabo-fcm.firebasestorage.app",
    messagingSenderId: "564318915692",
    appId: "1:564318915692:web:beafd7e7d83749ba12dc49",
    measurementId: "G-YPHPKBNWYN",
});
// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
    console.log("Background message received: ", payload);

    // 알림 제목과 옵션 설정
    const notificationTitle = payload.notification?.title || "Default Title";
    const notificationOptions = {
        body: payload.notification?.body || "Default Body",
        icon: payload.notification?.icon || "/firebase-logo.png", // 아이콘 경로
    };

    // 알림 표시
    self.registration.showNotification(notificationTitle, notificationOptions);
});