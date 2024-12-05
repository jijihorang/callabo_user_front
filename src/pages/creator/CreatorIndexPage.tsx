import {Outlet} from "react-router-dom";

function CreatorIndexPage() {
    return (
            <div>
                <Outlet></Outlet>  {/* 하위 라우트를 렌더링하는 자리 */}
            </div>
    );
}

export default CreatorIndexPage;