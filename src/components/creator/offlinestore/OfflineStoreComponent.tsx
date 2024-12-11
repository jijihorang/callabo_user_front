import { useEffect, useState } from "react";
import MapComponent from "../../common/MapComponent.tsx";
import { getOfflineStoreList } from "../../../apis/offlinestore/offlinestoreAPI.ts";
import {IOfflineStore} from "../../../types/offlinestore/iofflinestore.ts";

function OfficeStoreComponent() {
    const [stores, setStores] = useState<IOfflineStore[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const data = await getOfflineStoreList();
                setStores(data);
            } catch (error) {
                console.error("Failed to load offline stores:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStores();
    }, []);

    // 데이터 렌더링 함수
    const renderStoreCards = (data: IOfflineStore[]) => {
        return data.map((store) => (
            <div
                key={store.storeNo}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
            >
                {/* 가게 이미지 */}
                <img
                    src={store.storeImage || "https://via.placeholder.com/300"}
                    alt={store.storeName || "스토어 이미지"}
                    className="w-full h-60 object-cover"
                />
                {/* 정보 섹션 */}
                <div className="p-6 text-center">
                    <button className="bg-blue-500 text-white font-semibold rounded-full px-4 py-2 shadow-md hover:bg-yellow-500 mb-4">
                        {store.storeName || "스토어 이름 없음"}
                    </button>
                    {/* 지도 컴포넌트 */}
                    <MapComponent latitude={store.latitude} longitude={store.longitude} />
                    {/* 주소 */}
                    <p className="text-sm text-gray-700 text-center mt-4">{store.storeAddress}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 헤더 */}
            <div className="mb-10 text-center">
                <h2 className="text-lg text-gray-600">오픈한 오프라인 스토어</h2>
                <h1 className="text-4xl font-extrabold text-gray-900">Offline Store</h1>
            </div>
            {/* 카드 레이아웃 */}
            {loading ? (
                <div>Loading...</div>
            ) : stores.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {renderStoreCards(stores)}
                </div>
            ) : (
                <div className="text-center text-gray-500">스토어가 없습니다.</div>
            )}
        </div>
    );
}

export default OfficeStoreComponent;
