import React from "react";
import wheart from "../../assets/icons/whiteheart.png";
import redHeart from "../../assets/icons/redheart.png";
import { toggleProductLikeAPI } from "../../apis/customer/customerAPI";

interface LikeButtonProps {
    customerId: string;
    productId: number;
    currentStatus: boolean;
    onToggle: (newStatus: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ customerId, productId, currentStatus, onToggle }) => {
    const handleLikeToggle = async () => {
        try {
            await toggleProductLikeAPI(customerId, productId.toString(), !currentStatus);
            onToggle(!currentStatus); // 부모 컴포넌트에 새로운 상태 전달
        } catch (error) {
            console.error("좋아요 상태 변경 중 오류 발생:", error);
        }
    };

    return (
        <button className="absolute top-2 right-2 p-1" onClick={handleLikeToggle}>
            <img
                src={currentStatus ? redHeart : wheart}
                alt={currentStatus ? "좋아요 취소" : "좋아요"}
                className="w-5 h-5"
            />
        </button>
    );
};

export default LikeButton;
