import prof from "../../../assets/img/pro1.webp";

const creators = [
    { id: 1, name: "또간집", type: "협업", rank: 1, image:"profile-image-url" },
    { id: 2, name: "차린건쥐뿔도없지만", type: "유튜버", rank: 2, image: "profile-image-url" },
    { id: 3, name: "싸이코드 감제이", type: "버츄얼", rank: 3, image: "profile-image-url" },
    { id: 4, name: "약국 2025 캘린더", type: "NEW", rank: 4, image: "profile-image-url" },
    { id: 5, name: "싸이코드 감제이", type: "버츄얼", rank: 3, image: "profile-image-url" },
    { id: 6, name: "약국 2025 캘린더", type: "NEW", rank: 4, image: "profile-image-url" },
    { id: 7, name: "약국 2025 캘린더", type: "NEW", rank: 4, image: "profile-image-url" },
];

function CreatorRankingComponent() {
    return (
        <div className="container mx-auto px-4 py-10 mb-10">
            {/* 제목 */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">WEEKLY CREATOR TOP 10</h2>
                <a href="/see-more" className="text-sm text-gray-500 hover:underline">
                    See More
                </a>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* 왼쪽 메인 카드 */}
                <div className="col-span-4 bg-green-600 text-white rounded-lg shadow-lg relative">
                    <div className="p-6">
                        <h3 className="text-lg font-bold">WEEKLY RANKING</h3>
                        <p className="text-4xl font-extrabold mt-2">TOP 1</p>
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-40 h-40 bg-green-800 rounded-full flex justify-center items-center">
                            <img src={prof} alt="1위 제작자" className="rounded-full"/>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-green-700 text-center p-4">
                        <p className="font-bold">또간집 X 더마비</p>
                    </div>
                </div>

                {/* 오른쪽 랭킹 리스트 */}
                <div className="col-span-8 bg-white rounded-lg shadow-md p-4">
                    <ul className="grid grid-cols-2 gap-4">
                        {creators.slice(1).map((creator, index) => (
                            <li
                                key={creator.id}
                                className="flex items-center gap-4"
                            >
                                <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={prof}
                                        alt={creator.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">
                                        {index + 2}. {creator.name}
                                    </h3>
                                </div>
                                {/* 순위 변동 표시 (예: 상승, 하락, NEW) */}
                                <div className="text-right mr-3">
                                    {creator.rank > 3 ? (
                                        <span className="text-blue-500 text-sm">NEW</span>
                                    ) : (
                                        <span className="text-red-500 text-sm">▲1</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CreatorRankingComponent;