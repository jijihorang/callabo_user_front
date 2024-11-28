import React, { useState, useEffect } from "react";

import HeaderComponent from "../components/common/HeaderComponent.tsx";
import FooterComponent from "../components/common/FooterComponent.tsx";

function BasicLayout({ children }: { children: React.ReactNode }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // 스크롤 감지
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // 스크롤 내리면 숨김
                setIsHeaderVisible(false);
            } else {
                // 스크롤 올리면 표시
                setIsHeaderVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className="flex flex-col min-h-screen">
            <header
                className={`bg-white fixed top-0 w-full z-50 transition-transform duration-300 ${
                    isHeaderVisible ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <HeaderComponent/>
            </header>


            {/* Main Content */}
            <main className="flex-1 bg-white mt-[80px]">{children}</main>


            <FooterComponent></FooterComponent>
        </div>
    );
}

export default BasicLayout;
