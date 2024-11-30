import banner from "../../assets/img/차쥐뿔.png";
import profile from "../../assets/img/pro1.webp";
import product1 from "../../assets/img/prod1.png"
import product2 from "../../assets/img/prod2.png";
import product3 from "../../assets/img/prod3.png";
import product4 from "../../assets/img/prod4.png";

import cart2 from "../../assets/icons/cart.png";
import {Link} from "react-router-dom";

function CreatorReadComponent() {

    const products = [
        { id: 1, name: "맥주잔 세트", price: "21,000원", image: product1 },
        { id: 2, name: "소주잔 세트", price: "21,000원", image: product2 },
        { id: 3, name: "스페셜 백", price: "28,000원", image: product3 },
        { id: 4, name: "유리잔", price: "15,000원", image: product4 },
        { id: 5, name: "맥주잔 세트", price: "21,000원", image: product1 },
        { id: 6, name: "소주잔 세트", price: "21,000원", image: product2 },
        { id: 7, name: "스페셜 백", price: "28,000원", image: product3 },
        { id: 8, name: "유리잔", price: "15,000원", image: product4 },
        { id: 9, name: "맥주잔 세트", price: "21,000원", image: product1 },
        { id: 10, name: "소주잔 세트", price: "21,000원", image: product2 },
        { id: 11, name: "스페셜 백", price: "28,000원", image: product3 },
        { id: 12, name: "유리잔", price: "15,000원", image: product4 },
        { id: 13, name: "맥주잔 세트", price: "21,000원", image: product1 },
        { id: 14, name: "소주잔 세트", price: "21,000원", image: product2 },
        { id: 15, name: "스페셜 백", price: "28,000원", image: product3 },
        { id: 16, name: "유리잔", price: "15,000원", image: product4 },
    ];

    return (
        <div className="container mx-auto mb-20">
            {/* 배너 */}
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-5">
                <img
                    src={banner}
                    alt="배너 이미지"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 제작자 정보 */}
            <div className="text-center mb-8">
                <div
                    className="relative inline-block w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md -mt-12">
                    <img
                        src={profile}
                        alt="제작자 프로필"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-2xl font-bold mt-4">차린건쥐뿔도없지만</h2>
            </div>

            {/* 상품 리스트 */}
            <div className="px-4">
                <h2 className="text-[15px] mb-1">당신의 취향을 저격할</h2>
                <h1 className="text-[30px] font-bold mb-5">PRODUCTS</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="relative p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                        >
                            <Link to="/creator/detail">
                                {/* 상품 이미지 */}
                                <div className="w-full h-48 overflow-hidden rounded-md mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* 상품 정보 */}
                                <h4 className="text-[18px] font-bold">{product.name}</h4>
                                <p className="text-gray-700 mt-1">[포카증정] 많이 받아가</p>
                                <p className="text-gray-500 mt-1">{product.price}</p>

                                {/* 장바구니 버튼 */}
                                <button
                                    className="absolute bottom-4 right-4 p-3 bg-white rounded-full border border-gray-300 shadow hover:bg-gray-100 transition-all"
                                    onClick={() => console.log(`${product.name} 장바구니에 추가됨`)}
                                >
                                    <img
                                        src={cart2}
                                        alt="장바구니 담기"
                                        className="w-6 h-6"
                                    />
                                </button>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default CreatorReadComponent;
