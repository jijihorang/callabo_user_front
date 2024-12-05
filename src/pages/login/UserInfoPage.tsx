import UserInfoComponent from "../../components/login/UserInfoComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function UserInfoPage() {
    return (
        <BasicLayout>
            <div>
                <UserInfoComponent></UserInfoComponent>
            </div>
        </BasicLayout>
    );
}

export default UserInfoPage;