import { lazy, Suspense } from "react";
import LoadingPage from "../pages/common/LoadingPage.tsx";

export const Loading = <LoadingPage />;

const PersonalColorPage = lazy(() => import("../pages/personalcolor/PersonalColorPage.tsx"));

const personalcolorRouter = {
    path: "/personalcolor",
    element: <Suspense fallback={Loading}><PersonalColorPage/></Suspense>
};

export default personalcolorRouter;
