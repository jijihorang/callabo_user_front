import banner from "../../../assets/img/차쥐뿔.png";
import profile from "../../../assets/img/pro1.webp";
import { Link } from "react-router-dom";

interface Creator {
    id: number;
    name: string;
}

interface CreatorInfoComponentProps {
    creator: Creator;
}

function CreatorInfoComponent({ creator }: CreatorInfoComponentProps) {

    return (
        <div className="container mx-auto mb-5 px-4">
            {/* 배너 */}
            <div className="relative w-full h-[480px] rounded-xl overflow-hidden mb-8 shadow-lg">
                <img
                    src={banner}
                    alt="배너 이미지"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 제작자 정보 */}
            <div className="text-center mb-10">
                <div
                    className="relative inline-block w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 shadow-xl -mt-14">
                    <img
                        src={profile}
                        alt="제작자 프로필"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-3xl font-extrabold mt-2 text-gray-800">
                    {creator.name}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                    이 제작자가 제공하는 특별한 스토어를 만나보세요!
                </p>
            </div>

            <div className="text-center">
                <Link
                    to="/creator/read"
                    className="inline-block px-8 py-3 text-lg text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md transition-colors duration-200"
                >
                    스토어 구경하기
                </Link>
            </div>
        </div>
    );
}

export default CreatorInfoComponent;
