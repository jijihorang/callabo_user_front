import CartComponent from "../../components/cart/CartComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function CartPage() {
    return (
        <BasicLayout>
            <div>
                <CartComponent/>
            </div>
        </BasicLayout>
    );
}

export default CartPage;