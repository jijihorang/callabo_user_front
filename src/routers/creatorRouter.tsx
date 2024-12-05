import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const CreateIndex = lazy(() => import("../pages/creator/CreatorIndexPage.tsx"));

const CreateList = lazy(() => import("../pages/creator/CreatorListPage.tsx"));

const CreateAllList = lazy(() => import("../pages/creator/CreatorAllListPage.tsx"));


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
            path: "list",
            element: <Suspense fallback={Loading}><CreateList/></Suspense>
        },
        {
            path: "list/all",
            element: <Suspense fallback={Loading}><CreateAllList/></Suspense>
        }
    ]
}

export default creatorRouter