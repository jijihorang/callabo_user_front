import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";

const ReviewRegisterPage = lazy(() => import("../pages/review/ReviewRegisterPage.tsx"))

const ReviewListPage = lazy(() => import("../pages/review/ReviewListPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const reviewRouter ={
    path: "/review",
    children: [
        {
            path: "register",
            element: <Suspense fallback={Loading}><ReviewRegisterPage/></Suspense>
        },
        {
          path: "list",
          element: <Suspense fallback={Loading}><ReviewListPage/></Suspense>
        },
    ]
}

export default reviewRouter;