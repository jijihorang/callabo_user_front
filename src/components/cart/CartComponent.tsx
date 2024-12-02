import mangnani from "../../assets/img/mangnani.png";
import soju from "../../assets/img/soju.png";
import roulette from "../../assets/img/roulette.png";
import trash from "../../assets/icons/trash.png";

function CartPage() {
  
    const cartGroups = [
        {
            groupName: "차린건쥐뿔도없지만",
            products: [
                {
                    id: 1,
                    img: mangnani,
                    name: "[포카 증정] 차쥐뿔 추천 구성 맥주잔+차쥐뿔 병따개 SET",
                    price: 21000,
                    category: "유리컵/머그컵",
                    quantity: 1,
                },
                {
                    id: 2,
                    img: soju,
                    name: "[한정수량] 망나니 잔 (2024년 12월 배송)",
                    price: 15000,
                    category: "유리컵/머그컵",
                    quantity: 1,
                },
            ],
            shippingFee: 3000,
        },
        {
            groupName: "싸이코드 감자에",
            products: [
                {
                    id: 3,
                    img: roulette,
                    name: "오니제이 포토카드",
                    price: 7500,
                    category: "세로포토카드",
                    quantity: 1,
                },
            ],
            shippingFee: 0,
        },
    ];
    return (
        <div className="container mx-auto px-4 py-8 flex">
            {/* 상품 목록 영역 */}
            <div className="w-2/3 space-y-8">
                <h2 className="text-2xl font-bold mb-2">장바구니</h2>

                {cartGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {/* 제작자 그룹 체크박스 */}
                        <div className="border-t-2 border-gray-400 pb-4 pt-3 flex items-center">
                            <input type="checkbox" className="mr-4" />
                            <h3 className="text-lg font-bold flex items-center">
                                {group.groupName}
                                <span role="img" aria-label="배송" className="ml-2">📦</span>
                            </h3>
                        </div>

                        {/* 상품 리스트 */}
                        {group.products.map((product) => (
                            <div
                                key={product.id}
                                className="py-3 flex flex-col space-y-3"
                            >
                                <div className="flex items-center">
                                    {/* 체크박스 */}
                                    <input type="checkbox" className="mr-4" />
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="ml-5 flex-grow">
                                        <div className="font-semibold text-lg">{product.name}</div>
                                        <div className="text-gray-400 text-sm mt-1">
                                            {product.category}
                                        </div>
                                        <div className="text-lg font-bold mt-2">
                                            {product.price.toLocaleString()}원
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button className="px-4 py-1 border border-gray-300 rounded text-gray-500">
                                            수량 변경
                                        </button>
                                        <button>
                                            <img
                                                src={trash}
                                                alt="삭제"
                                                className="w-6 h-6"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4">
                                    <div>수량 / {product.quantity}개</div>
                                    <div className="font-bold">
                                        {(product.price * product.quantity).toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-center mt-5 font-semibold border-t-2 border-gray-400 pt-5">
                            상품금액{" "}
                            {group.products
                                .reduce((acc, p) => acc + p.price * p.quantity, 0)
                                .toLocaleString()}
                            원 + 배송비 {group.shippingFee.toLocaleString()}원 = 주문금액{" "}
                            <span className="font-bold">
                                {(
                                    group.products.reduce(
                                        (acc, p) => acc + p.price * p.quantity,
                                        0
                                    ) + group.shippingFee
                                ).toLocaleString()}
                                원
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 주문 정보 영역 */}
            <div className="w-1/3 ml-12">
                <div className="sticky top-20 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-6 border-b-2 border-gray-400 pb-3 text-center">주문정보</h2>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">총 수량</span>
                        <span className="font-semibold">4개</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">총 상품금액</span>
                        <span className="font-semibold">
                            {cartGroups
                                .reduce(
                                    (acc, group) =>
                                        acc +
                                        group.products.reduce((sum, p) => sum + p.price * p.quantity, 0),
                                    0
                                )
                                .toLocaleString()}
                            원
                        </span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">총 배송비</span>
                        <span className="font-semibold">
                            {cartGroups.reduce((acc, group) => acc + group.shippingFee, 0).toLocaleString()}
                            원
                        </span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                        <span>총 주문금액</span>
                        <span className="text-blue-600">40,000원</span>
                    </div>
                    <button
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-semibold text-center hover:bg-blue-500"
                    >
                        주문서 작성 <span
                        className="ml-2 rounded-full bg-white text-blue-600 px-2 py-1 text-sm font-bold">4</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
