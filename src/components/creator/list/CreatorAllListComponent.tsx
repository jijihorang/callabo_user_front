import heartIcon from "../../../../public/icons/whiteheart.png";
import { useEffect, useState } from "react";
import { ICreator } from "../../../types/creator/icreator.ts";
import { getCreatorList } from "../../../apis/creator/creatorAPI.ts";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/customer/AuthStore.ts";

function CreatorAllListComponent() {
    const [creators, setCreators] = useState<ICreator[]>([]);
    const { customer } = useAuthStore();

    // 데이터 로딩 상태 관리
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    // API 호출 및 데이터 설정
    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const data = await getCreatorList(customer?.customerId || "");
                setCreators(data);
            } catch (error) {
                console.error("제작자 데이터를 불러오는 데 실패했습니다.", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCreators();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-bold">로딩 중...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto mb-20 px-4 sm:px-6 lg:px-8">
            <div className="mt-10">
                <h2 className="text-sm text-gray-500 mb-1">모든 크리에이터가 모였다!</h2>
                <h1 className="text-2xl font-bold mb-5">All Creators</h1>
            </div>

            {/* 제작자 카드 리스트 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {creators.map((creator) => (
                    <div
                        key={creator.creatorId}
                        className="rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-5 shadow-md flex flex-col items-center relative"
                    >
                        {/* 프로필 이미지 */}
                        <img
                            src={creator.logoImg}
                            alt={creator.creatorName}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full mb-3 border-4 border-white shadow-md"
                        />

                        {/* 이름 */}
                        <h3 className="text-sm sm:text-base font-semibold text-center">{creator.creatorName}</h3>
                        <button
                            className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg mt-3"
                            onClick={() => navigate(`/creator/read/${creator.creatorId}`)}>
                            스토어 구경
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreatorAllListComponent;
