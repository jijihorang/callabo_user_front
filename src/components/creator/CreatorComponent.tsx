import { useState } from "react";
import CreatorListComponent from "./list/CreatorListComponent.tsx";
import CreatorInfoComponent from "./list/CreatorInfoComponent.tsx";

// Creator 타입 정의
interface Creator {
    name: string;
    id: number;
}

function CreatorComponent() {
    const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const creators = [
        { name: "제작자 1", id: 1 },
        { name: "제작자 2", id: 2 },
        { name: "제작자 3", id: 3 },
        { name: "제작자 4", id: 4 },
        { name: "제작자 5", id: 5 },
        { name: "제작자 6", id: 6 },
        { name: "제작자 7", id: 7 },
        { name: "제작자 8", id: 8 },
        { name: "제작자 9", id: 9 },
        { name: "제작자 10", id: 10 },
        { name: "제작자 11", id: 11 },
        { name: "제작자 12", id: 12 },

        // 더 많은 데이터...
    ];

    const handleCreatorSelect = (creator: Creator) => {
        setSelectedCreator(creator); // 선택된 제작자 정보 업데이트
    };

    return (
        <div className="container mx-auto mb-20">

            <div className="flex flex-col md:flex-row gap-6 mt-10">
                {/* 제작자 목록 */}
                <div className="w-full md:w-1/4 p-6 shadow-md rounded-lg h-full">
                    <CreatorListComponent
                        creators={creators}
                        onSelectCreator={handleCreatorSelect}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>


                {/* 제작자 상세 정보 */}
                <div className="w-full md:w-3/4 p-8 bg-white shadow-lg rounded-xl h-auto border border-gray-200">
                    {selectedCreator ? (
                        <div className="space-y-6">
                            <CreatorInfoComponent creator={selectedCreator} />
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center h-48 text-gray-500 space-y-2">
                            <p className="text-lg font-semibold">제작자를 선택해주세요.</p>
                            <p className="text-sm text-gray-400">
                                선택된 제작자 정보가 이곳에 표시됩니다.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default CreatorComponent;
