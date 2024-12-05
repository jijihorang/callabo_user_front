import heartIcon from "../../assets/icons/whiteheart.png";

import {useEffect, useState} from "react";
import {ICreator} from "../../types/creator/icreator.ts";
import {getCreatorList} from "../../apis/creator/creatorAPI.ts";
import {useNavigate} from "react-router-dom";

function CreatorAllListComponent() {
    const [creators, setCreators] = useState<ICreator[]>([]);

    // 데이터 로딩 상태 관리
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    // API 호출 및 데이터 설정
    useEffect (() => {
        const fetchCreators = async () => {
            try {
                const data = await getCreatorList();
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
        <div className="container mx-auto mb-20">
            <div className="px-4 mt-10">
                <h2 className="text-[15px] mb-1">모든 크리에이터가 모였다!</h2>
                <h1 className="text-[30px] font-bold mb-5">All Creators</h1>
            </div>

            {/* 제작자 카드 리스트 */}
            <div className="grid grid-cols-4 gap-6 px-4">
                {creators.map((creator) => (
                    <div
                        key={creator.creatorId}
                        className="rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 p-5 shadow-md flex flex-col items-center relative"
                    >
                        {/* 프로필 이미지 */}
                        <img
                            src={creator.logoImg}
                            alt={creator.creatorName}
                            className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-white shadow-md"
                        />

                        {/* 이름 */}
                        <h3 className="text-base font-semibold">{creator.creatorName}</h3>

                        {/* 팔로우 상태 */}
                        <div className="absolute top-4 right-4 flex items-center">
                            <img
                                src={heartIcon}
                                alt="좋아요"
                                className="w-5 h-5 mr-1"
                            />
                        </div>

                        <button
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-3"
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
