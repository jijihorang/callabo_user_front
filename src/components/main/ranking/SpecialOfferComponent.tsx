import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";
import {ICreator} from "../../../types/creator/icreator.ts";
import {getCreatorList} from "../../../apis/creator/creatorAPI.ts";
import {useNavigate} from "react-router-dom";


const SpecialOfferComponent = () => {
    const [creators, setCreators] = useState<ICreator[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBannerCreators = async () => {
            try {
                const data = await getCreatorList();
                setCreators(data);
            } catch (error) {
                console.error("Failed to fetch creators:", error);
            }
        };

        fetchBannerCreators();
    }, []);

    const handleClickProduct = (creatorId?: string) => {
        if(creatorId){
            navigate(`/product/list/${creatorId}`)
        }
    }

    console.log(creators);

    return (
        <div className="relative w-full bg-black">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                className="w-full"
            >
                {creators.map((creator) => (
                    <SwiperSlide key={creator.creatorId}>
                        <div
                            className="relative w-full h-[35vh] sm:h-[40vh] md:h-[40vh] lg:h-[35vh] flex flex-col items-center bg-cover bg-center overflow-hidden"
                            style={{
                                backgroundImage: `url(${creator.backgroundImg || ""})`,
                            }}
                        >
                            {/* 오버레이 */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90"></div>

                            {/* 텍스트 콘텐츠 */}
                            <div
                                className="relative z-10 text-center text-white px-6 max-w-lg mt-6 sm:mt-8 md:mt-8 lg:mt-8 space-y-4">
                                <p>제작자</p>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                    {creator.creatorName}
                                </h1>
                            </div>

                            {/* 로고 이미지 */}
                            <div className="relative z-10 mt-4 sm:mt-6 lg:mt-8">
                                <img
                                    src={creator.logoImg || ""}
                                    alt={creator.creatorName}
                                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-lg shadow-md"
                                    onClick={() => handleClickProduct(creator.creatorId)}
                                />
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SpecialOfferComponent;
