import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";

export const Loading = <LoadingPage></LoadingPage>

const OrderListPage = lazy(() => import("../pages/order/OrderListPage.tsx"))

const orderRouter = {
    path: "/order",
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><OrderListPage/></Suspense>
        }
    ]
}
export default orderRouter;