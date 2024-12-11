
const RankingProductComponent = () => {
    const products = [
        {
            id: 1,
            title: "[크리스마스 한정기획] 홀리데이 랜덤박스",
            price: "25,000원",
            imageUrl: "path/to/image1.png", // 이미지 경로
        },
        {
            id: 2,
            title: "도심이 2025 달력 포스터 (A3)",
            price: "8,000원",
            imageUrl: "path/to/image2.png",
        },
        {
            id: 3,
            title: "약국 2025 캘린더",
            price: "18,000원",
            imageUrl: "path/to/image3.png",
        },
        {
            id: 4,
            title: "약국 2025 캘린더",
            price: "18,000원",
            imageUrl: "path/to/image3.png",
        },
        {
            id: 5,
            title: "약국 2025 캘린더",
            price: "18,000원",
            imageUrl: "path/to/image3.png",
        },
        {
            id: 6,
            title: "약국 2025 캘린더",
            price: "18,000원",
            imageUrl: "path/to/image3.png",
        },
        {
            id: 7,
            title: "약국 2025 캘린더",
            price: "18,000원",
            imageUrl: "path/to/image3.png",
        },
        {
            id: 8,
            title: "약국 2025 캘린더",
            price: "18,000원",
            imageUrl: "path/to/image3.png",
        },
        {
            id: 9,
            title: "약국 2025 캘린더",
            price: "18,000원",
            imageUrl: "path/to/image3.png",
        },
        {
            id: 10,
            title: "약국 2025 캘린더",
            price: "18,000원",
            imageUrl: "path/to/image3.png",
        },
    ];

    return (
        <div className="container mx-auto p-4 mb-20">
            <h3 className="text-sm text-gray-500">인기 상품 랭킹</h3>
            <h2 className="text-2xl font-bold mb-4">WEEKLY BEST</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg shadow hover:shadow-lg p-4 relative"
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="mt-2">
                            <h3 className="text-sm font-medium">{product.title}</h3>
                            <p className="text-lg font-semibold mt-1">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RankingProductComponent;