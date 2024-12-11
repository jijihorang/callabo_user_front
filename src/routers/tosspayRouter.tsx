import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";

const CheckoutPage = lazy(() => import("../pages/tosspay/CheckoutPage.tsx"))
const SuccessPage = lazy(() => import("../pages/tosspay/SuccessPage.tsx"))
const FailPage = lazy(() => import("../pages/tosspay/FailPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const tosspayRouter = {
    path: "/tosspay",
    children: [
        {
            path: "checkout",
            element: <Suspense fallback={Loading}><CheckoutPage/></Suspense>
        },
        {
            path: "success",
            element: <Suspense fallback={Loading}><SuccessPage/></Suspense>
        },
        {
            path: "fail",
            element: <Suspense fallback={Loading}><FailPage/></Suspense>
        },
    ]
}

export default tosspayRouter;