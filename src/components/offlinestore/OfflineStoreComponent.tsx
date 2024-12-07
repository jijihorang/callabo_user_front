import { useEffect, useState } from "react";
import axios from "axios";
import shop1 from "../../assets/img/shop1.png";
import map from "../../assets/img/map.png";
import shop2 from "../../assets/img/shop2.png";

// 데이터 타입 정의
interface StoreType {
    id?: number; // 더미 데이터는 id가 있고 API 데이터는 storeNo 사용
    storeNo?: number;
    img?: string;
    map?: string;
    address?: string;
    storeAddress?: string;
    storeEmail?: string;
    storeImage?: string;
    storeName?: string;
    storePhone?: string;
    latitude?: number;
    longitude?: number;
}

function OfficeStoreComponent() {
    const [stores, setStores] = useState<StoreType[]>([]);
    const [loading, setLoading] = useState(true);

    // 더미 데이터
    const dummyData: StoreType[] = [
        { id: 1, img: shop1, map: map, address: "ADDRESS. 충청북도 청주시 흥덕구 풍산로 18 1층 청주시외버스터미널 옆", storeName: "청주점" },
        { id: 2, img: shop2, map: map, address: "ADDRESS. 서울특별시 강남구 테헤란로 123 2층 강남역 인근", storeName: "강남점" },
        { id: 3, img: shop1, map: map, address: "ADDRESS. 부산광역시 해운대구 해운대로 456 3층 해운대역 근처", storeName: "해운대점" },
        { id: 4, img: shop2, map: map, address: "ADDRESS. 대구광역시 중구 동성로 789 4층 동성로 중앙", storeName: "대구점" },
    ];

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api2/creator/offlinestore/list");
                setStores(response.data);
            } catch (error) {
                console.error("API 호출 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    // 타입 명시
    const renderStoreCards = (data: StoreType[]) => {
        return data.map((store: StoreType) => (
            <div
                key={store.id || store.storeNo}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
            >
                {/* 가게 이미지 */}
                <img
                    src={store.img || store.storeImage || shop1}
                    alt={store.storeName || "스토어 이미지"}
                    className="w-full h-60 object-cover"
                />
                {/* 정보 섹션 */}
                <div className="p-6 text-center">
                    <button className="bg-blue-500 text-white font-semibold rounded-full px-4 py-2 shadow-md hover:bg-yellow-500 mb-4">
                        {store.storeName || "제작자명"}
                    </button>
                    {/* 지도 이미지 */}
                    <img
                        src={store.map || map}
                        alt="지도"
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    {/* 주소 */}
                    <p className="text-sm text-gray-700 text-center">{store.address || store.storeAddress}</p>
                    {store.storePhone && <p className="text-sm text-gray-600 mt-2">Phone: {store.storePhone}</p>}
                    {store.storeEmail && <p className="text-sm text-gray-600 mt-2">Email: {store.storeEmail}</p>}
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8 mb-10">
            {/* 헤더 */}
            <div className="mb-10">
                <h2 className="text-lg text-gray-600">오픈한 오프라인 스토어</h2>
                <h1 className="text-4xl font-extrabold text-gray-900">Offline Store</h1>
            </div>
            {/* 카드 레이아웃 */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stores.length > 0 ? renderStoreCards(stores) : renderStoreCards(dummyData)}
                </div>
            )}
        </div>
    );
}

export default OfficeStoreComponent;
