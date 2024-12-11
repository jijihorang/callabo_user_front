import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";

const ProductList = lazy(() => import("../pages/product/ProductListPage.tsx"));

const ProductDetail = lazy(() => import("../pages/product/ProductDetailPage.tsx"));

const ProductOrderPage = lazy(() => import("../pages/product/order/ProductOrderPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const productRouter = {
    path: "/product",
    children: [
        {
            path: "list/:creatorId",
            element: <Suspense fallback={Loading}><ProductList/></Suspense>
        },
        {
            path: ":creatorId/detail/:productNo",
            element: <Suspense fallback={Loading}><ProductDetail/></Suspense>
        },
        {
            path: "order",
            element: <Suspense fallback={Loading}><ProductOrderPage/></Suspense>
        },
    ]
}

export default productRouter;