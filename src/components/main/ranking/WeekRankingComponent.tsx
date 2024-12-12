import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ICreator } from "../../../types/creator/icreator.ts";
import { getCreatorList } from "../../../apis/creator/creatorAPI.ts";

function WeeklyRanking() {
    const [creators, setCreators] = useState<ICreator[]>([]);
    const [topCreator, setTopCreator] = useState<ICreator | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const data = await getCreatorList();
                const sortedCreators = data
                    .sort((a, b) => (b.followerCount || 0) - (a.followerCount || 0))
                    .slice(0, 10);

                setCreators(sortedCreators.slice(1)); // Top 1 제외
                setTopCreator(sortedCreators[0]); // Top 1 설정
            } catch (error) {
                console.error("크리에이터 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchCreators();
    }, []);

    const handleCreatorClick = (creatorId: string | undefined) => {
        if (creatorId) {
            navigate(`/product/list/${creatorId}`);
        }
    };

    return (
        <div className="container mx-auto p-4 mb-20">
            {/* 제목 */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-sm text-gray-500">인기 크리에이터 랭킹</h3>
                    <h1 className="text-2xl font-bold">CREATOR TOP 10</h1>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* TOP 1 크리에이터 */}
                {topCreator && (
                    <div
                        className="w-full lg:w-1/4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-white p-6 rounded-lg relative cursor-pointer"
                        onClick={() => handleCreatorClick(topCreator.creatorId)}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0 rounded-lg"
                            style={{
                                backgroundImage: `url(${topCreator.backgroundImg})`,
                            }}
                        />
                        <div className="relative z-10">
                            <h2 className="text-sm font-bold mb-2">WEEKLY RANKING</h2>
                            <h1 className="text-5xl font-bold mb-4">
                                TOP 1 <span className="text-blue-400 text-sm">NEW</span>
                            </h1>
                            <div className="w-32 h-32 mx-auto mb-4">
                                <img
                                    src={topCreator.logoImg}
                                    alt={topCreator.creatorName}
                                    className="w-full h-full object-cover rounded-full border-4 border-white"
                                />
                            </div>
                            <h2
                                className="text-center text-xl font-semibold truncate"
                                title={topCreator.creatorName}
                            >
                                {topCreator.creatorName}
                            </h2>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-50 z-0 rounded-lg"></div>
                    </div>
                )}

                {/* 나머지 9개의 크리에이터 */}
                <div className="w-full lg:w-3/4">
                    <div className="hidden lg:grid grid-cols-3 gap-4"> {/* 데스크톱 레이아웃 */}
                        {creators.map((creator, index) => (
                            <div
                                key={creator.creatorId}
                                className="flex flex-col items-center p-4 bg-white rounded-md cursor-pointer"
                                onClick={() => handleCreatorClick(creator.creatorId)}
                            >
                                <div className="text-center mb-2">
                                    <div className="font-bold text-lg">{`Top ${index + 2}`}</div>
                                </div>
                                <img
                                    src={creator.logoImg}
                                    alt={creator.creatorName}
                                    className="w-20 h-20 rounded-full mb-2 object-cover"
                                />
                                <div
                                    className="text-center font-bold text-sm truncate max-w-full overflow-hidden whitespace-nowrap"
                                    title={creator.creatorName}
                                >
                                    {creator.creatorName}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={16}
                        slidesPerView={1}
                        pagination={{
                            type: "fraction",
                            clickable: true, // Pagination 클릭 가능 설정
                            el: ".custom-pagination",
                        }}
                        className="lg:hidden w-full" // 모바일 환경에서만 표시
                    >
                        {Array.from({length: Math.ceil(creators.length / 3)}).map(
                            (_, index) => (
                                <SwiperSlide key={index}>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        {creators
                                            .slice(index * 3, index * 3 + 3)
                                            .map((creator) => (
                                                <div
                                                    key={creator.creatorId}
                                                    className="flex flex-row items-center p-4 bg-white rounded-md cursor-pointer"
                                                    onClick={() =>
                                                        handleCreatorClick(creator.creatorId)
                                                    }
                                                >
                                                    <div
                                                        className="flex items-center justify-center w-25 h-25 mr-4">
                                                        <img
                                                            src={creator.logoImg}
                                                            alt={creator.creatorName}
                                                            className="w-16 h-16 rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-lg mb-1">
                                                            {`Top ${creators.indexOf(creator) + 2}`}
                                                        </div>
                                                        <div
                                                            className="text-sm truncate max-w-full overflow-hidden whitespace-nowrap"
                                                            title={creator.creatorName}
                                                        >
                                                            {creator.creatorName}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </SwiperSlide>
                            )
                        )}
                        <div
                            className="custom-pagination bottom-[-30px] left-0 right-0 flex justify-center gap-1 z-10">
                        </div>
                    </Swiper>

                </div>
            </div>
        </div>

    );
}

export default WeeklyRanking;