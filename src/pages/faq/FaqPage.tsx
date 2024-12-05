import FaqComponent from "../../components/faq/FaqComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function FaqPage() {
    return (
        <BasicLayout>
            <div>
                <FaqComponent/>
            </div>
        </BasicLayout>
    );
}

export default FaqPage;