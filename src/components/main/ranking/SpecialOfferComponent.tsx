
const SpecialOfferComponent = () => {
    const products = [
        {
            id: 1,
            title: "약국 2025 캘린더",
            description: "약국 2025 캘린더",
            price: "18,000원",
            limited: true,
            imageUrl: "path/to/image1.png", // 이미지 경로
        },
        {
            id: 2,
            title: "상수리나무 아래",
            description: "상수리나무 아래 2부 한정판 양장본 세트",
            price: "169,000원",
            limited: true,
            imageUrl: "path/to/image2.png",
        },
        {
            id: 3,
            title: "첫눈에 맨투맨",
            description: "소풍족",
            price: "44,900원",
            limited: true,
            rating: "5.0",
            imageUrl: "path/to/image3.png",
        },
        {
            id: 4,
            title: "2025 냉면달력",
            description: "냉면달력",
            price: "15,000원",
            imageUrl: "path/to/image4.png",
        },
    ];

    return (
        <div className="bg-black text-white p-8">
            <div className="container mx-auto p-4 mb-20">
            <h2 className="text-2xl font-bold mb-4">
                특별함을 구매
            </h2>
            <h3 className="text-xl font-bold mb-6">LIMITED EDITION</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 relative"
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h4 className="text-sm font-semibold">{product.title}</h4>
                        <p className="text-xs text-gray-400">{product.description}</p>
                        <p className="text-lg font-bold mt-2">{product.price}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default SpecialOfferComponent;
