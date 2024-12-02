import OrderComponent from "../../components/order/OrderComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function OrderPage() {
    return (
        <BasicLayout>
            <div>
                <OrderComponent/>
            </div>
        </BasicLayout>
    );
}

export default OrderPage;