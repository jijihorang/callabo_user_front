import {createBrowserRouter, Navigate} from "react-router-dom";
import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import creatorRouter from "./creatorRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage.tsx"))

const LoginPage = lazy(() => import("../pages/login/LoginPage.tsx"))

const CartPage = lazy(() => import("../pages/cart/CartPage.tsx"))

const WishListPage = lazy(() => import("../pages/wishlist/WishlistPage.tsx"))

const KakaoCallbackPage = lazy(() => import("../pages/login/KakaoCallbackPage.tsx"))

const OrderPage = lazy(() => import("../pages/order/OrderPage.tsx"))

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
        path: "/kakao",
        element: <Suspense fallback={Loading}><KakaoCallbackPage /></Suspense>, // Kakao 인증 Callback
    },
    {
        path: "/order",
        element: <Suspense fallback={Loading}><OrderPage/></Suspense>
    },
    creatorRouter
])

export default mainRouter