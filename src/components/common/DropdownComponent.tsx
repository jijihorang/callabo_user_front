import {useState} from "react";

import down from "../../assets/icons/down.png"

interface DropdownProps {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
}

function DropdownComponent({ selectedOption, setSelectedOption }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const options = ["최신순", "인기순"];

    const handleOptionClick = (option: string) => {
        setSelectedOption(option); // 부모 컴포넌트의 상태 변경
        setIsOpen(false); // 드롭다운 닫기
    };

    return (
        <div className="relative w-30">
            {/* Dropdown Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded shadow flex justify-between items-center focus:outline-none"
            >
                <span>{selectedOption}</span>
                <img  src={down} alt="드롭다운" className="w-5 h-5 ml-2"/>
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownComponent;
