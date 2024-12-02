

function WeeklyRanking() {
    return (
        <div className="p-6">
            {/* 제목 */}
            <div className="text-center mb-6">
                <h3 className="text-sm text-gray-500">11월 5주차 인기 크리에이터 랭킹</h3>
                <h1 className="text-2xl font-bold">WEEKLY CREATOR TOP 10</h1>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-6">


                {/* 나머지 랭킹 */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        <div className="text-center">
                            <img
                                src=""
                                alt="차린건쥐뿔도..."
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">차린건쥐뿔도...</div>
                            <div className="text-sm text-gray-500">유튜버</div>
                            <div className="text-sm font-bold">-</div>
                        </div>
                        <div className="text-center">
                            <img
                                src=""
                                alt=""
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">싸이코드 감제이</div>
                            <div className="text-sm text-gray-500">버츄얼</div>
                            <div className="text-sm font-bold text-green-500">▲1</div>
                        </div>
                        <div className="text-center">
                            <img
                                src=""
                                alt="러끼"
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">러끼</div>
                            <div className="text-sm text-gray-500">유튜버</div>
                            <div className="text-sm font-bold text-red-500">▼1</div>
                        </div>
                        <div className="text-center">
                            <img
                                src=""
                                alt="약국 2025 캠..."
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">약국 2025 캠...</div>
                            <div className="text-sm font-bold text-blue-500">NEW</div>
                        </div>
                        <div className="text-center">
                            <img
                                src=""
                                alt="잿쓰비"
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">잿쓰비</div>
                            <div className="text-sm font-bold text-red-500">▼1</div>
                        </div>
                        <div className="text-center">
                            <img
                                src=""
                                alt="Khundi Panda"
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">Khundi Panda</div>
                            <div className="text-sm font-bold text-blue-500">NEW</div>
                        </div>
                        <div className="text-center">
                            <img
                                src=""
                                alt="곰국집"
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">곰국집</div>
                            <div className="text-sm font-bold text-green-500">▲1</div>
                        </div>
                        <div className="text-center">
                            <img
                                src=""
                                alt="너진짜똑똑하다"
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">너진짜똑똑하다</div>
                            <div className="text-sm text-gray-500">유튜버</div>
                            <div className="text-sm font-bold text-blue-500">NEW</div>
                        </div>
                        <div className="text-center">
                            <img
                                src=""
                                alt="서월"
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                            />
                            <div className="font-bold">서월</div>
                            <div className="text-sm font-bold text-blue-500">NEW</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 더보기 */}
            <div className="text-right mt-4">
                <button className="text-blue-500 font-bold">See More</button>
            </div>
        </div>
    );
}

export default WeeklyRanking;
