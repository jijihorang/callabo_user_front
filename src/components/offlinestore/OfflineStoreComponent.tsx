import shop1 from "../../assets/img/shop1.png"
import map from "../../assets/img/map.png"
import shop2 from "../../assets/img/shop2.png"

function ShopPage() {
    const dummyData = [
        { id: 1, img: shop1, map: map, address: "ADDRESS. 충청북도 청주시 흥덕구 풍산로 18 1층 청주시외버스터미널 바로 옆 위치" },
        { id: 2, img: shop2, map: map, address: "ADDRESS. 서울특별시 강남구 테헤란로 123 2층 강남역 인근" },
        { id: 3, img: shop1, map: map, address: "ADDRESS. 부산광역시 해운대구 해운대로 456 3층 해운대역 근처" },
        { id: 4, img: shop2, map: map, address: "ADDRESS. 대구광역시 중구 동성로 789 4층 동성로 중앙" },
        { id: 5, img: shop1, map: map, address: "ADDRESS. 광주광역시 북구 일곡동 101 1층 일곡지구 중심지" },
        { id: 6, img: shop2, map: map, address: "ADDRESS. 인천광역시 연수구 송도동 202 2층 송도국제도시" },
        { id: 7, img: shop1, map: map, address: "ADDRESS. 경기도 성남시 분당구 정자동 303 1층 정자역 부근" },
        { id: 8, img: shop2, map: map, address: "ADDRESS. 제주특별자치도 제주시 노형동 404 2층 제주공항 인근" },
    ];

    return (
        <div className="mx-1 mb-20">
            <div className="text-center mb-10">
                <h2 className="text-[15px] mb-1">당신의 취향을 저격할</h2>
                <h1 className="text-[30px] font-bold">Offline Store</h1>
            </div>
            {/* 카드 레이아웃 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4"> {/* 중간 화면부터 한 줄에 두 개 */}
                {dummyData.map((item) => (
                    <div key={item.id} className="border-2 border-black rounded-md p-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                            {/* 이미지 */}
                            <img src={item.img} alt="삭제" className="w-full md:w-[250px] h-auto mt-14" />
                            {/* 정보 */}
                            <div className="flex flex-col items-center w-full"> {/* 버튼 중간 정렬 */}
                                <button className="bg-yellow-500 font-bold rounded-full text-black px-4 py-2 mb-4">
                                    제작자명
                                </button>
                                <img src={item.map} alt="삭제" className="w-full h-52 mb-4" />
                                <div className="text-sm text-center">{item.address}</div> {/* 텍스트도 중앙 정렬 */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopPage;
