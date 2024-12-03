import {createBrowserRouter, Navigate} from "react-router-dom";
import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import creatorRouter from "./creatorRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage.tsx"))

const LoginPage = lazy(() => import("../pages/LoginPage.tsx"))

const CartPage = lazy(() => import("../pages/cart/CartPage.tsx"))

const WishListPage = lazy(() => import("../pages/wishlist/WishlistPage.tsx"))

const OrderPage = lazy(() => import("../pages/order/OrderPage.tsx"))

const OfflineStorePage = lazy(() => import("../pages/offlinestore/OfflineStorePage.tsx"))

const WeekRankingPage = lazy(() => import("../pages/weekranking/WeekRankingPage.tsx"))

const ReviewLeadPage = lazy(() => import("../pages/reviewlead/ReviewLead.Page.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const mainRouter = createBrowserRouter([
    {
        path: "/main",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>
    },
    {
        path: "/",
        element: <Navigate to="main" replace={true}></Navigate>
    },
    {
        path: "/login",
        element: <Suspense fallback={Loading}><LoginPage/></Suspense>
    },
    {
        path: "/wishlist",
        element: <Suspense fallback={Loading}><WishListPage/></Suspense>
    },
    {
        path: "/cart",
        element: <Suspense fallback={Loading}><CartPage/></Suspense>
    },
    {
        path: "/weekranking",
        element: <Suspense fallback={Loading}><WeekRankingPage/></Suspense>
    },
    {
        path: "/offlinestore",
        element: <Suspense fallback={Loading}><OfflineStorePage/></Suspense>
    },
    {
        path: "/reviewlead",
        element: <Suspense fallback={Loading}><ReviewLeadPage/></Suspense>
    },
    {
        path: "/order",
        element: <Suspense fallback={Loading}><OrderPage/></Suspense>
    },
    creatorRouter
])

export default mainRouter