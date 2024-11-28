import BasicLayout from "../../layouts/BasicLayout.tsx";
import {Outlet} from "react-router-dom";

function CreatorIndexPage() {
    return (
        <BasicLayout>
            <div>
                <Outlet></Outlet>  {/* 하위 라우트를 렌더링하는 자리 */}
            </div>
        </BasicLayout>
    );
}

export default CreatorIndexPage;