import { useState, useEffect } from "react";
import { onMessageListener } from "../../config/firebase-config.ts";
import useAuthStore from "../../stores/customer/AuthStore.ts";

// FCM 메시지 타입 정의
interface NotificationPayload {
    notification?: {
        title?: string;
        body?: string;
        icon?: string;
    };
}

const NotificationPopup = () => {
    const [message, setMessage] = useState<NotificationPayload | null>(null);
    const customerName = useAuthStore((state) => state.customer?.customerName || "알 수 없음"); // Zustand에서 customerName 가져오기

    useEffect(() => {
        onMessageListener()
            .then((payload) => {
                const notificationPayload = payload as NotificationPayload; // 타입 단언
                console.log("Message received: ", notificationPayload);
                setMessage(notificationPayload); // 메시지 상태 업데이트
            })
            .catch((err) => console.error("Error receiving message: ", err));
    }, []);

    if (!message) return null;

    const link = message?.notification?.body || "/"; // 메시지에서 링크 가져오기, 기본값은 홈(`/`)

    return (
        <div style={popupStyles.overlay}>
            <div style={popupStyles.popup}>
                <h2 style={popupStyles.title}>📩 {`${customerName}님에게 보내는 제안`}</h2>
                <p style={popupStyles.description}>
                    {`${message?.notification?.title || "제목 없음"}`}
                </p>
                <div style={popupStyles.buttonContainer}>
                    <a href={link} style={popupStyles.link}>
                        <button style={popupStyles.primaryButton}>이동하기</button>
                    </a>
                    <button onClick={() => setMessage(null)} style={popupStyles.secondaryButton}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

const popupStyles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    popup: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        maxWidth: "360px",
        width: "100%",
        animation: "fadeIn 0.5s ease-in-out",
    },
    title: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "10px",
    },
    description: {
        fontSize: "14px",
        color: "#555",
        marginBottom: "20px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-around",
    },
    primaryButton: {
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "10px 20px",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
    },
    secondaryButton: {
        backgroundColor: "#ddd",
        color: "#333",
        border: "none",
        borderRadius: "6px",
        padding: "10px 20px",
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
    },
    link: {
        textDecoration: "none",
    },
};

export default NotificationPopup;
