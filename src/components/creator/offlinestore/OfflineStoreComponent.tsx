import shop1 from "../../../assets/img/shop1.png"
import map from "../../../assets/img/map.png"
import shop2 from "../../../assets/img/shop2.png"

function OfficeStoreComponent() {
    const dummyData = [
        { id: 1, img: shop1, map: map, address: "ADDRESS. 충청북도 청주시 흥덕구 풍산로 18 1층 청주시외버스터미널 옆" },
        { id: 2, img: shop2, map: map, address: "ADDRESS. 서울특별시 강남구 테헤란로 123 2층 강남역 인근" },
        { id: 3, img: shop1, map: map, address: "ADDRESS. 부산광역시 해운대구 해운대로 456 3층 해운대역 근처" },
        { id: 4, img: shop2, map: map, address: "ADDRESS. 대구광역시 중구 동성로 789 4층 동성로 중앙" },
        { id: 5, img: shop1, map: map, address: "ADDRESS. 광주광역시 북구 일곡동 101 1층 일곡지구 중심지" },
        { id: 6, img: shop2, map: map, address: "ADDRESS. 인천광역시 연수구 송도동 202 2층 송도국제도시" },
        { id: 7, img: shop1, map: map, address: "ADDRESS. 경기도 성남시 분당구 정자동 303 1층 정자역 부근" },
        { id: 8, img: shop2, map: map, address: "ADDRESS. 제주특별자치도 제주시 노형동 404 2층 제주공항 인근" },
        { id: 9, img: shop1, map: map, address: "ADDRESS. 부산광역시 부산진구 전포대로 203" },
    ];

    return (
        <div className="container mx-auto px-4 py-8 mb-10">
            {/* 헤더 */}
            <div className="mb-10">
                <h2 className="text-lg text-gray-600">오픈한 오프라인 스토어</h2>
                <h1 className="text-4xl font-extrabold text-gray-900">Offline Store</h1>
            </div>
            {/* 카드 레이아웃 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyData.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
                    >
                        {/* 가게 이미지 */}
                        <img
                            src={item.img}
                            alt="샵 이미지"
                            className="w-full h-70 object-cover"
                        />
                        {/* 정보 섹션 */}
                        <div className="p-6 text-center">
                            <button
                                className="bg-blue-500 text-white font-semibold rounded-full px-4 py-2 shadow-md hover:bg-yellow-500 mb-4">
                                제작자명
                            </button>
                            {/* 지도 이미지 */}
                            <img
                                src={item.map}
                                alt="지도"
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            {/* 주소 */}
                            <p className="text-sm text-gray-700 text-center">{item.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OfficeStoreComponent;
