import {useNavigate} from "react-router-dom";

function OrderListComponent() {

    const navigate = useNavigate();

    const orders = [
        {
            id: 1,
            date: "2024.12.05 16:01",
            creatorName: "토심이",
            product: {
                name: "토심이 2025 달력 포스터 (A4) _ 숫자 크기가 작아요",
                category: "포스터 (A4)",
                price: 6000,
                image: "https://via.placeholder.com/150",
                status: "배송완료",
            },
        },
    ];

    const moveToRegister= () => {
        navigate("/review/register")
    }

    return (
        <div className="container mx-auto mt-5 pb-5 px-4 lg:px-8">

            {/* 주문 내역 */}
            {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    {/* 주문 날짜 */}
                    <div className="text-gray-500 text-sm mb-2">{order.date}</div>

                    {/* 제작자 정보 */}
                    <div className="text-black font-bold flex items-center mb-4">
                        {order.creatorName}
                    </div>

                    {/* 제품 정보 */}
                    <div className="flex items-start">
                        <img
                            src={order.product.image}
                            alt={order.product.name}
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-grow">
                            <div className="text-gray-700 text-sm">{order.product.category}</div>
                            <div className="font-bold text-gray-800">{order.product.name}</div>
                            <div className="text-gray-700 text-sm mt-1">{order.product.price.toLocaleString()} 원</div>
                        </div>
                    </div>

                    {/* 상태와 버튼 */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-black font-bold">{order.product.status}</div>
                        <button className="px-4 py-2 border border-gray-400 rounded text-sm" onClick={moveToRegister}>
                            리뷰 쓰기
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderListComponent;
