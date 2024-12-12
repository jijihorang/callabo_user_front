import rank1 from "../../../../public/img/rank1.png";
import rank2 from "../../../../public/img/rank2.png";
import rank3 from "../../../../public/img/rank3.png";
import rank4 from "../../../../public/img/rank4.png";
import rank5 from "../../../../public/img/rank5.png";
import rank6 from "../../../../public/img/rank6.png";
import rank7 from "../../../../public/img/rank7.png";
import rank8 from "../../../../public/img/rank8.png";
import rank9 from "../../../../public/img/rank9.png";

function WeeklyRanking() {
    const creators = [
        { rank: "Top2", name: "차린건쥐뿔도없지만", img: rank2 },
        { rank: "Top3", name: "싸이코드 감제이", img: rank3},
        { rank: "Top4", name: "러끼", img: rank4},
        { rank: "Top5", name: "약국 2025 캘린더", img: rank5 },
        { rank: "Top6", name: "토심이", img: rank6},
        { rank: "Top7", name: "토마토", img: rank7 },
        { rank: "Top8", name: "칠보기", img: rank8 },
        { rank: "Top9", name: "49", img: rank9 },
    ];

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
                {/* 메인 랭킹 */}
                <div className="flex-1 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-white p-6 rounded-lg">
                    <h2 className="text-sm font-bold">WEEKLY RANKING</h2>
                    <h1 className="text-4xl font-bold mb-4">TOP 1 <span className="text-blue-400 text-sm">NEW</span></h1>
                    <div className="w-48 h-48 mx-auto mb-4">
                        <img
                            src={rank1}
                            alt="또간집"
                            className="w-full h-full object-contain rounded-md"
                        />
                    </div>
                </div>

                {/* 나머지 랭킹 */}
                <div className="flex-1 text-black p-4 rounded-lg">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {creators.map((creator, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center p-3 bg-white shadow-lg rounded-md"
                            >
                                <div className="text-center mb-2">
                                    <div className="font-bold">{creator.rank}</div>
                                </div>
                                <img
                                    src={creator.img}
                                    alt={creator.name}
                                    className="w-16 h-16 rounded-full mb-2"
                                />
                                <div
                                    className="text-center font-bold text-sm truncate"
                                    title={creator.name}
                                >
                                    {creator.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeeklyRanking;

