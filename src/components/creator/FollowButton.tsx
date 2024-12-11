import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { toggleFollowStatusAPI } from "../../apis/creator/creatorAPI";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

interface FollowButtonProps {
    creatorId: string;
    currentStatus: boolean;
    customerId: string;
    onUnfollow?: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
   creatorId,
   currentStatus,
   customerId,
   onUnfollow,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const queryClient = useQueryClient();

    const handleToggleFollow = async () => {
        try {
            await toggleFollowStatusAPI(customerId, creatorId, !currentStatus);

            queryClient.invalidateQueries(["likedCreators", customerId]);
            queryClient.invalidateQueries(["creatorList", customerId]);

            if (!currentStatus && onUnfollow) {
                onUnfollow();
            }
        } catch (error) {
            console.error("팔로우 상태 변경 중 오류 발생:", error);
        }
    };

    return (
        <div className="relative group">
            {/* 버튼 */}
            <button
                onClick={handleToggleFollow}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 shadow-md ${
                    currentStatus
                        ? "bg-blue-500 hover:bg-blue-300"
                        : "bg-gray-500 hover:bg-gray-300"
                }`}
            >
                <span className="relative">
                    {isHovered && currentStatus ? (
                        <FaHeartBroken size={16} />
                    ) : (
                        <FaHeart size={16} />
                    )}
                </span>
                <span className="text-sm md:text-base whitespace-nowrap">
                    {currentStatus ? "언팔로우" : "팔로잉"}
                </span>
            </button>

            {/*/!* 툴팁 *!/*/}
            {/*{isHovered && (*/}
            {/*    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-xs rounded-md shadow-lg whitespace-nowrap">*/}
            {/*        {currentStatus ? "팔로우 취소" : "팔로우 추가"}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default FollowButton;
