import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";

const QnARegisterPage = lazy(() => import("../pages/qna/QnARegisterPage.tsx"))

const QnAListPage = lazy(() => import("../pages/qna/QnAListPage.tsx"))

const QnAReadPage = lazy(() => import("../pages/qna/QnAReadPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const qnaRouter = {
    path: "/qna",
    children: [
        {
            path: "register",
            element: <Suspense fallback={Loading}><QnARegisterPage/></Suspense>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><QnAListPage/></Suspense>
        },
        {
            path: "read",
            element: <Suspense fallback={Loading}><QnAReadPage/></Suspense>
        },
    ]
}

export default qnaRouter;