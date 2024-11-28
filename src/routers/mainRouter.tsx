import {createBrowserRouter, Navigate} from "react-router-dom";
import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import creatorRouter from "./creatorRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage.tsx"))

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
        element: <Suspense fallback={Loading}></Suspense>
    },
    creatorRouter
])

export default mainRouter