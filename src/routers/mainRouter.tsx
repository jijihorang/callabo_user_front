import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import creatorRouter from "./creatorRouter.tsx";
import customerRouter from "./customerRouter.tsx";
import productRouter from "./productRouter.tsx";
import BasicLayout from "../layouts/BasicLayout.tsx";

const MainPage = lazy(() => import("../pages/MainPage.tsx"))

const LoginPage = lazy(() => import("../pages/login/LoginPage.tsx"))

const CartPage = lazy(() => import("../pages/cart/CartPage.tsx"))

const WishListPage = lazy(() => import("../pages/wishlist/WishlistPage.tsx"))

const OrderPage = lazy(() => import("../pages/order/OrderPage.tsx"))

const UserInfoPage = lazy(() => import("../pages/login/UserInfoPage.tsx"))

const WeekRankingPage = lazy(() => import("../pages/weekranking/WeekRankingPage.tsx"))

const OfflineStorePage = lazy(() => import("../pages/offlinestore/OfflineStorePage.tsx"))

const AccountSettingPage = lazy(() => import("../pages/login/AccountSettingsPage.tsx"))

// const CreatorReviewsPage = lazy(() => import("../pages/review/CreatorReviewsPage.tsx"))

const CreatorReviewReadPage = lazy(() => import("../pages/creatorreviews/CreatorReviewReadPage.tsx"))

const ReviewRegisterPage = lazy(() => import("../pages/reviewwriting/ReviewRegisterPage.tsx"))

const FaqPage = lazy(() => import("../pages/faq/FaqPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const mainRouter = createBrowserRouter([
    {
        element: (
            <BasicLayout>
                <Outlet/>
            </BasicLayout>
        ),
        children: [
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
                path: "/user",
                element: <Suspense fallback={Loading}><UserInfoPage/></Suspense>
            },
            {
                path: "/order",
                element: <Suspense fallback={Loading}><OrderPage/></Suspense>
            },
            {
                path: "/account",
                element: <Suspense fallback={Loading}><AccountSettingPage/></Suspense>
            },
            {
                path: "review/read",
                element: <Suspense fallback={Loading}><CreatorReviewReadPage/></Suspense>
            },
            {
                path: "/review",
                element: <Suspense fallback={Loading}><ReviewRegisterPage/></Suspense>
            },
            // {
            //     path: "/review",
            //     element: <Suspense fallback={Loading}><CreatorReviewsPage/></Suspense>
            // },
            {
                path: "/faq",
                element: <Suspense fallback={Loading}><FaqPage/></Suspense>
            },
            creatorRouter,
            customerRouter,
            productRouter,
        ]
    }
])

export default mainRouter