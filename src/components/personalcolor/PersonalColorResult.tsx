import React from "react";

interface Props {
    result: string;
}

const PersonalColorResult: React.FC<Props> = ({ result }) => {
    return (
        <div className="personal-color-result bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
                🎨 분석 결과
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {result}
            </p>
        </div>
    );
};

export default PersonalColorResult;
