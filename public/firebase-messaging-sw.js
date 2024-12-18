importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAMM5mIJ-k4F4DAbQwksCWrgg94djk4rMI",
    authDomain: "collabo-fcm.firebaseapp.com",
    projectId: "collabo-fcm",
    storageBucket: "collabo-fcm.firebasestorage.app",
    messagingSenderId: "564318915692",
    appId: "1:564318915692:web:beafd7e7d83749ba12dc49",
    measurementId: "G-YPHPKBNWYN",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Background message received:", payload);

    const notificationTitle = payload.notification?.title || "Default Title";
    const notificationOptions = {
        body: payload.notification?.body || "Default Body",
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});