import MainFractionSlider from "../components/slider/MainFractionSlider.tsx";
import WeekRankingComponent from "../components/main/ranking/WeekRankingComponent.tsx";
import RankingProductComponent from "../components/main/ranking/RankingProductComponent.tsx";
import SpecialOfferComponent from "../components/main/ranking/SpecialOfferComponent.tsx";

function MainPage() {
    return (
        <div>
            <div>
                <MainFractionSlider></MainFractionSlider>
            </div>

            <div className="mt-20">
                <WeekRankingComponent/>
            </div>

            <div className="mt-20 mb-20">
                <SpecialOfferComponent/>
            </div>

            <div>
                <RankingProductComponent/>
            </div>
        </div>
    );
}

export default MainPage;