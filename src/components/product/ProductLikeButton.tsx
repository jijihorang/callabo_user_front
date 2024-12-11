import React, { useEffect, useState } from "react";
import wheart from "../../assets/icons/whiteheart.png";
import redHeart from "../../assets/icons/redheart.png";
import { toggleProductLikeAPI, checkProductLikeStatusAPI } from "../../apis/customer/customerAPI";

interface LikeButtonProps {
    customerId: string;
    productId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ customerId, productId }) => {
    const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 초기 좋아요 상태 가져오기
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const status = await checkProductLikeStatusAPI(customerId, productId.toString());
                setIsLiked(status);
            } catch (error) {
                console.error("좋아요 상태 확인 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLikeStatus();
    }, [customerId, productId]);

    const handleLikeToggle = async () => {
        try {
            setLoading(true); // 상태 변경 중 로딩 상태로 설정
            await toggleProductLikeAPI(customerId, productId.toString());
            setIsLiked((prev) => !prev); // 상태 토글
        } catch (error) {
            console.error("좋아요 상태 변경 중 오류 발생:", error);
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };

    if (loading) {
        return (
            <button className="absolute top-2 right-2 p-1" disabled>
                <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
            </button>
        );
    }

    return (
        <button className="absolute top-2 right-2 p-1" onClick={handleLikeToggle} disabled={loading}>
            <img
                src={isLiked ? redHeart : wheart}
                alt={isLiked ? "좋아요 취소" : "좋아요"}
                className="w-5 h-5"
            />
        </button>
    );
};

export default LikeButton;
