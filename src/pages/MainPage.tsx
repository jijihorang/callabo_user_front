import BasicLayout from "../layouts/BasicLayout.tsx";
import MainFractionSlider from "../components/slider/MainFractionSlider.tsx";


function MainPage() {
    return (
        <BasicLayout>
           <div>
               <MainFractionSlider></MainFractionSlider>
           </div>
        </BasicLayout>
    );
}

export default MainPage;