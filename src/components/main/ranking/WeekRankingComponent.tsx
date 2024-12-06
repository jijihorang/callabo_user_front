import rank1 from "../../../assets/img/rank1.png";
import rank2 from "../../../assets/img/rank2.png";
import rank3 from "../../../assets/img/rank3.png";
import rank4 from "../../../assets/img/rank4.png";
import rank5 from "../../../assets/img/rank5.png";
import rank6 from "../../../assets/img/rank6.png";
import rank7 from "../../../assets/img/rank7.png";
import rank8 from "../../../assets/img/rank8.png";
import rank9 from "../../../assets/img/rank9.png";
import rank10 from "../../../assets/img/rank10.png";

function WeeklyRanking() {
    return (
        <div className="p-6">
            {/* 제목과 더보기 버튼을 한 줄에 배치 */}
            <div className="flex items-center justify-between mb-6">
                <div className="text-left">
                    <h3 className="text-sm text-gray-500">12월 1주차 인기 크리에이터 랭킹</h3>
                    <h1 className="text-2xl font-bold">WEEKLY CREATOR TOP 10</h1>
                </div>
                <button className="text-blue-500 font-bold">See More</button>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-6">
                {/* 메인 랭킹 */}
                <div className="flex-1 md:max-w-[20%] bg-green-900 text-white p-6 rounded-lg relative">
                    <h2 className="text-sm font-bold">WEEKLY RANKING</h2>
                    <h1 className="text-4xl font-bold mb-4">TOP 1</h1>
                    <div className="w-full h-auto mb-4 relative">
                        <div
                            className="w-44 h-44 bg-green-500 mask-heart flex items-center justify-center mx-auto overflow-hidden p-2">
                            <img
                                src={rank1}
                                alt="또간집"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">또간집 X 더마비 44❤️</div>
                </div>

                {/* 나머지 랭킹 */}
                <div className="flex-1 md:max-w-[80%] bg-gray-100 text-black p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
                        {/* 예시 항목 1 */}
                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top2</div>
                                <div className="text-sm font-bold text-blue-500">-</div>
                            </div>
                            <img
                                src={rank2}
                                alt="차린건쥐뿔도쥐뿔도없지만"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">차린건쥐뿔도없지만</div>
                                <div className="text-sm text-gray-500">유튜버</div>
                            </div>
                        </div>

                        {/* 예시 항목 2 */}
                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top3</div>
                                <div className="text-sm font-bold text-green-500">▲1</div>
                            </div>
                            <img
                                src={rank3}
                                alt="싸이코드 감제이"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">싸이코드 감제이</div>
                                <div className="text-sm text-gray-500">버츄얼</div>
                            </div>
                        </div>

                        {/* 나머지 항목들 */}
                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top4</div>
                                <div className="text-sm font-bold text-red-500">▼1</div>
                            </div>
                            <img
                                src={rank4}
                                alt="러끼"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">러끼</div>
                                <div className="text-sm text-gray-500">유튜버</div>
                            </div>
                        </div>

                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top5</div>
                                <div className="text-sm font-bold text-blue-500">NEW</div>
                            </div>
                            <img
                                src={rank5}
                                alt="약국 2025 캘린더"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">약국 2025 캘린더</div>
                            </div>
                        </div>

                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top6</div>
                                <div className="text-sm font-bold text-red-500">▼1</div>
                            </div>
                            <img
                                src={rank6}
                                alt="잿쓰비"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">잿쓰비</div>
                            </div>
                        </div>

                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top7</div>
                                <div className="text-sm font-bold text-blue-500">NEW</div>
                            </div>
                            <img
                                src={rank7}
                                alt="Khundi Panda"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">Khundi Panda</div>
                            </div>
                        </div>

                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top8</div>
                                <div className="text-sm font-bold text-green-500">▲1</div>
                            </div>
                            <img
                                src={rank8}
                                alt="곰국집"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">곰국집</div>
                            </div>
                        </div>

                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top9</div>
                                <div className="text-sm font-bold text-blue-500">NEW</div>
                            </div>
                            <img
                                src={rank9}
                                alt="너진짜똑똑하다"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">너진짜똑똑하다</div>
                                <div className="text-sm text-gray-500">유튜버</div>
                            </div>
                        </div>

                        <div className="flex items-center w-full p-3 border-b border-gray-300">
                            <div className="text-right mr-4">
                                <div className="font-bold">Top10</div>
                                <div className="text-sm font-bold text-blue-500">NEW</div>
                            </div>
                            <img
                                src={rank10}
                                alt="서월"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <div className="font-bold">서월</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default WeeklyRanking;
