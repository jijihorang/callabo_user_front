import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";

const WishListPage = lazy(() => import("../pages/wishlist/WishlistPage.tsx"))

const CartPage = lazy(() => import("../pages/cart/CartPage.tsx"))

const UserInfoPage = lazy(() => import("../pages/login/UserInfoPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const headerRouter = {
    path: "/header",
    children: [
        {
            path: "wishlist",
            element: <Suspense><WishListPage/></Suspense>
        },
        {
            path: "cart",
            element: <Suspense fallback={Loading}><CartPage/></Suspense>
        },
        {
            path: "user",
            element: <Suspense fallback={Loading}><UserInfoPage/></Suspense>
        },
    ]
}

export default headerRouter;