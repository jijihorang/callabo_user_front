import AccountSettingsComponent from "../../components/login/AccountSettingsComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function AccountSettingsPage() {
    return (
        <BasicLayout>
            <div>
                <AccountSettingsComponent/>
            </div>
        </BasicLayout>
    );
}

export default AccountSettingsPage;