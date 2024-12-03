import LoadingPage from "../pages/common/LoadingPage.tsx";
import {lazy, Suspense} from "react";

export const Loading = <LoadingPage></LoadingPage>

const KakaoCallbackPage = lazy(() => import("../pages/login/KakaoCallbackPage.tsx"))

const customerRouter = {
    path: "/customer",
    children: [
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoCallbackPage/></Suspense>
        }
    ]
}

export default customerRouter