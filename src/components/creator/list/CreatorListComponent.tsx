import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import useCreatorStore from "../../../stores/creator/CreatorStore.ts";
import {getCreatorList} from "../../../apis/creator/creatorAPI.ts";
import click from "../../../assets/icons/click.png";
import {ICreator} from "../../../types/creator/icreator.ts";
import useAuthStore from "../../../stores/customer/AuthStore.ts";
import heart from "../../../assets/icons/redheart.png";

function CreatorListComponent() {
    const {
        creators,
        selectedCreator,
        searchQuery,
        isInitialized,
        setCreators,
        setSelectedCreator,
        setSearchQuery,
        setInitialized
    } = useCreatorStore();
    const customerId = useAuthStore((state) => state.customer?.customerId); // Zustand에서 customerId 가져오기
    const navigate = useNavigate();

    // React Query로 데이터 가져오기
    const {isLoading} = useQuery<ICreator[]>({
        queryKey: ["creatorList", customerId], // queryKey에 customerId 포함
        queryFn: () => {
            if (!customerId) {
                return Promise.reject(new Error("Customer ID is null")); // customerId가 없을 경우 명시적으로 에러 발생
            }
            return getCreatorList(customerId); // customerId 전달
        },
        staleTime: 0,
        refetchInterval: 0,
        enabled: !!customerId, // customerId가 있을 때만 활성화
        initialData: creators,
        onSuccess: (data: ICreator[]) => {
            if (!isInitialized) {
                setCreators(data);
                setInitialized(true);
            } else {
                setCreators(data);
            }
            console.log(data);
        },
        onError: (error) => {
            console.error("제작자 리스트를 불러오는 중 오류 발생:", error);
        },
    });

    // 제작자 선택
    const handleCreatorSelect = (creator: ICreator) => {
        setSelectedCreator(creator);
    };

    // 제작자 상품 리스트로 이동
    const moveToProductList = (creatorId?: string) => {
        if (creatorId) {
            navigate(`/product/list/${creatorId}`);
        }
    };

    // 제작자 검색 필터링
    const filteredCreators = creators.filter((creator) =>
        creator.creatorName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto mb-20 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 mt-10">
                {/* 제작자 목록 */}
                <div className="w-full md:w-1/4 p-6 shadow-md rounded-lg h-[300px] md:h-full"> {/* 모바일에서 높이 줄이기 */}
                    {isLoading ? (
                        <p className="text-center text-gray-500">제작자 로딩 중...</p>
                    ) : (
                        <>
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
                            <div className="h-[200px] md:h-[500px] md:h-[700px] overflow-y-auto space-y-4"> {/* 모바일에서 높이 줄이기 */}
                                <ul>
                                    {filteredCreators.map((creator, index) => (
                                        <li
                                            key={`${creator.creatorId}-${index}`}
                                            className="flex items-center justify-between gap-3 p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                                            onClick={() => handleCreatorSelect(creator)}
                                        >
                                            {/* 왼쪽 콘텐츠 */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                                    <img
                                                        src={creator.logoImg}
                                                        alt="제작자 이미지"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span
                                                    className="text-lg font-semibold text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap"
                                                    title={creator.creatorName} // 풀 네임을 툴팁으로 표시
                                                >
                                                    {creator.creatorName.length > 6
                                                        ? `${creator.creatorName.slice(0, 6)}...`
                                                        : creator.creatorName}
                                                </span>
                                            </div>
                                            {/* 팔로워 수 */}
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg shadow-sm">
                                                <img src={heart} alt="팔로워 아이콘" className="w-4 h-4" />
                                                <span>
                                                    <span className="font-bold text-gray-800">{creator.followerCount || 0}</span>명
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>

                {/* 제작자 상세 정보 */}
                <div className="w-full md:w-3/4 p-6 bg-white shadow-lg rounded-xl h-auto border border-gray-200">
                    {selectedCreator ? (
                        <div className="space-y-6">
                            <div className="relative w-full h-[480px] rounded-xl overflow-hidden mb-8 shadow-lg">
                                <img
                                    src={selectedCreator.backgroundImg}
                                    alt="배너 이미지"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center mb-10">
                                <div
                                    className="relative inline-block w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 shadow-xl -mt-14">
                                    <img
                                        src={selectedCreator.logoImg}
                                        alt="제작자 프로필"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-3xl font-extrabold mt-2 text-gray-800">
                                    {selectedCreator.creatorName || "제작자 이름 없음"}
                                </h2>
                                <p className="text-gray-500 text-sm mt-2">
                                    "{selectedCreator.creatorName}" 제작자의 특별한 상품을 만나보세요!
                                </p>
                            </div>
                            <div className="text-center">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => moveToProductList(selectedCreator.creatorId)}
                                >
                                    제작자 상품 보기
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="flex flex-col justify-center items-center min-h-full text-gray-500 space-y-4 rounded-lg p-6">
                            {/* 아이콘 */}
                            <div className="w-20 h-20 flex items-center justify-center rounded-full">
                                <img src={click} alt="클릭 이미지" className="w-12 h-12"/>
                            </div>
                            {/* 메인 텍스트 */}
                            <p className="text-lg font-semibold text-gray-700">제작자를 선택해주세요</p>
                            <p className="text-sm text-gray-500 text-center">
                                선택된 제작자 정보가 이곳에 표시됩니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreatorListComponent;