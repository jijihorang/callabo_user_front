import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import creatorRouter from "./creatorRouter.tsx";
import customerRouter from "./customerRouter.tsx";
import productRouter from "./productRouter.tsx";
import BasicLayout from "../layouts/BasicLayout.tsx";
import headerRouter from "./headerRouter.tsx";
import eventRouter from "./eventRouter.tsx";
import reviewRouter from "./reviewRouter.tsx";
import tosspayRouter from "./tosspayRouter.tsx";
import qnaRouter from "./qnaRouter.tsx";
import orderRouter from "./orderRouter.tsx";
import personalcolorRouter from "./personalcolorRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage.tsx"))

const LoginPage = lazy(() => import("../pages/login/LoginPage.tsx"))

const WeekRankingPage = lazy(() => import("../pages/weekranking/WeekRankingPage.tsx"))

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
                path: "/weekranking",
                element: <Suspense fallback={Loading}><WeekRankingPage/></Suspense>
            },
            {
                path: "/faq",
                element: <Suspense fallback={Loading}><FaqPage/></Suspense>
            },
            headerRouter,
            eventRouter,
            creatorRouter,
            customerRouter,
            productRouter,
            reviewRouter,
            tosspayRouter,
            qnaRouter,
            orderRouter,
            personalcolorRouter
        ]
    }
])

export default mainRouter