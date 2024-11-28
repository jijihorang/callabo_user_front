import pro1 from "../../../assets/img/img2.jpg";

interface Creator {
    id: number;
    name: string;
}

interface CreatorListComponentProps {
    creators: Creator[];
    onSelectCreator: (creator: Creator) => void;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function CreatorListComponent({creators, onSelectCreator, searchQuery, setSearchQuery}: CreatorListComponentProps) {

    const filteredCreators = creators.filter(creator =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* 검색창 */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="제작자를 검색해보세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
                />
            </div>

            {/* 제작자 목록 */}
            <div className="h-[500px] md:h-[700px] overflow-y-auto space-y-4">
                <ul>
                    {filteredCreators.map((creator) => (
                        <li
                            key={creator.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => onSelectCreator(creator)}
                        >
                            <div
                                className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                <img
                                    src={pro1}
                                    alt={`${creator.name} 이미지`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-lg font-semibold text-gray-700">
                                {creator.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CreatorListComponent;