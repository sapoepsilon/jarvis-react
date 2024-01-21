import Navbar from "@/components/navbar/NavBar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sparkles from "../public/sparkles.svg";
import Features from "@/components/FeaturesSection";
import HomeSection from "@/components/HomeSestion";
import NavBar from "@/components/navbar/NavBar";
import PulsatingBackground from "@/components/pulsating/PulsatingBackground";

const LandingPage: React.FC = () => {
    const [showNavbar, setShowNavbar] = useState<boolean>(true);
    let lastScrollY = 0;

    const handleScroll = () => {
        setShowNavbar(window.scrollY < lastScrollY);
        lastScrollY = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center relative">
            <Navbar className={showNavbar ? 'navbar-shown' : 'navbar-hidden sm:navbar-hidden'}/>

            <HomeSection/>
            <Features/>
            <section id="services" className=" sm:h-auto md:w-auto sm:w-auto">
            </section>
            <section id="pricing" className="h-screen md:w-auto sm:w-auto">
            </section>
            <section id="support" className="h-screen md:w-auto sm:w-auto">
            </section>
            <div id="targetSection" className="pt-6 flex items-center justify-center">
                <Image src={Sparkles} alt="Sparkles" width={100} height={100}/>
                <div className="w-full md:w-1/2">
                    <p className="font-inter font-interRegular text-lg md:text-2xl mt-6 text-center text-white ml-4">
                        Shape your success with our AI-powered tool, customize it to fit seamlessly into your business
                        vision.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
