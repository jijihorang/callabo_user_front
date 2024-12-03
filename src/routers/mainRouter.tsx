import {createBrowserRouter, Navigate} from "react-router-dom";
import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import creatorRouter from "./creatorRouter.tsx";
import customerRouter from "./customerRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage.tsx"))

const LoginPage = lazy(() => import("../pages/login/LoginPage.tsx"))

const CartPage = lazy(() => import("../pages/cart/CartPage.tsx"))

const WishListPage = lazy(() => import("../pages/wishlist/WishlistPage.tsx"))

const OrderPage = lazy(() => import("../pages/order/OrderPage.tsx"))

const UserInfoPage = lazy(() => import("../pages/login/UserInfoPage.tsx"))

const WeekRankingPage = lazy(() => import("../pages/weekranking/WeekRankingPage.tsx"))

const OfflineStorePage = lazy(() => import("../pages/offlinestore/OfflineStorePage.tsx"))

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
        path: "/wishlist",
        element: <Suspense fallback={Loading}><WishListPage/></Suspense>
    },
    {
        path: "/cart",
        element: <Suspense fallback={Loading}><CartPage/></Suspense>
    },
    {
        path: "/login",
        element: <Suspense fallback={Loading}><LoginPage/></Suspense>
    },
    {
        path: "/user",
        element: <Suspense fallback={Loading}><UserInfoPage/></Suspense>
    },
    {
        path: "/order",
        element: <Suspense fallback={Loading}><OrderPage/></Suspense>
    },
    {
        path: "weekranking",
        element: <Suspense fallback={Loading}><WeekRankingPage/></Suspense>
    },
    {
        path: "/offlinestore",
        element: <Suspense fallback={Loading}><OfflineStorePage/></Suspense>
    },
    creatorRouter,
    customerRouter
])

export default mainRouter