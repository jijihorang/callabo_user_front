import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";

const OfflineStorePage = lazy(() => import("../pages/offlinestore/OfflineStorePage.tsx"))


export const Loading = <LoadingPage></LoadingPage>

const eventRouter = {
    path: "/event",
    children: [
        {
            path: "offlineStore",
            element: <Suspense fallback={Loading}><OfflineStorePage/></Suspense>
        },
    ]
}

export default eventRouter;