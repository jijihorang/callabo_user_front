import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const CreateIndex = lazy(() => import("../pages/creator/CreatorIndexPage.tsx"));
const CreateList = lazy(() => import("../pages/creator/CreatorListPage.tsx"));
const CreateRead = lazy(() => import("../pages/creator/CreatorReadPage.tsx"));
const CreateDetail = lazy(() => import("../pages/creator/CreatorDetailPage.tsx"));

export const Loading = <LoadingPage></LoadingPage>

const creatorRouter = {
    path: "/creator",
    element: <Suspense fallback={Loading}><CreateIndex/></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="list" replace={true}/>
        },
        {
            // path: ":/makerName",
            path: "list",
            element: <Suspense fallback={Loading}><CreateList/></Suspense>
        },
        {
            path: "read",
            element: <Suspense fallback={Loading}><CreateRead/></Suspense>
        },
        {
            path: "detail",
            element: <Suspense fallback={Loading}><CreateDetail/></Suspense>
        }
    ]
}

export default creatorRouter