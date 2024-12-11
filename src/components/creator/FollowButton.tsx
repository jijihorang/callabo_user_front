import React, { useEffect, useState } from "react";
import { toggleFollowStatusAPI, checkFollowStatusAPI } from "../../apis/creator/creatorAPI";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

interface FollowButtonProps {
    customerId: string;
    creatorId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ customerId, creatorId }) => {
    const [isFollowed, setIsFollowed] = useState(false); // 팔로우 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [isHovered, setIsHovered] = useState(false); // 호버 상태

    // 초기 팔로우 상태 가져오기
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const status = await checkFollowStatusAPI(customerId, creatorId);
                setIsFollowed(status);
            } catch (error) {
                console.error("팔로우 상태 확인 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowStatus();
    }, [customerId, creatorId]);

    // 팔로우 상태 토글
    const handleToggleFollow = async () => {
        try {
            setLoading(true); // 로딩 시작
            await toggleFollowStatusAPI(customerId, creatorId);
            setIsFollowed((prev) => !prev); // 상태 반전
        } catch (error) {
            console.error("팔로우 상태 변경 중 오류 발생:", error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    // 로딩 상태 표시
    if (loading) {
        return (
            <button
                className="flex items-center justify-center px-4 py-2 bg-gray-300 rounded-full cursor-wait"
                disabled
            >
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            </button>
        );
    }

    // 버튼 UI
    return (
        <button
            onClick={handleToggleFollow}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-white transition-all duration-300 shadow-md ${
                isFollowed
                    ? "bg-gray-500 hover:bg-gray-400" // 팔로우 취소하기 버튼 색상
                    : "bg-blue-500 hover:bg-blue-400" // 팔로우 하기 버튼 색상
            }`}
        >
            {/* 아이콘: 팔로우/언팔로우 상태 및 호버에 따라 변경 */}
            <span className="relative">
                {isHovered && isFollowed ? <FaHeartBroken size={16} /> : <FaHeart size={16} />}
            </span>

            {/* 텍스트: 팔로우/언팔로우 상태에 따라 변경 */}
            <span className="text-sm md:text-base whitespace-nowrap">
                {isFollowed ? "팔로우 취소하기" : "팔로우 하기"}
            </span>
        </button>
    );
};

export default FollowButton;
