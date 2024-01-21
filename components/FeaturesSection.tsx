import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Calendar from "../public/calendar.svg";
import Dashboard from "../public/dashboard.svg";
import Voice from "../public/voice.svg";
import Sparkles from "../public/sparkles.svg";
import PulsatingBackground from "@/components/pulsating/PulsatingBackground";

const FeatureCard: React.FC<{ image: StaticImageData; alt: string; text: string }> = ({ image, alt, text }) => {
    // Set a default gradient background style
    const defaultStyle = {
        background: 'linear-gradient(to right, #3498db, #8e44ad)'
    };
    const [gradientStyle, setGradientStyle] = useState(defaultStyle);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY, currentTarget } = event;
        const { top, left, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;

        const newStyle = {
            background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, #3498db, #8e44ad)`
        };
        setGradientStyle(newStyle);
    };

    return (

        <div
            id="gradientBox"
            className="w-80 h-64 rounded-2xl border border-black bg-opacity-80 hover:bg-opacity-50 backdrop-blur-md bg-clip-padding backdrop-filter overflow-hidden"
            style={gradientStyle}
            onMouseMove={handleMouseMove}
        >

            <div className="m-4 flex flex-col items-center">

                <Image src={image} alt={alt} width={50} height={50} />
                <p className="text-white     font-inter font-interRegular text-xl mt-4">
                    {text}
                </p>
            </div>
        </div>
    );
};

const Features: React.FC = () => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const checkIfInView = () => {
            const target = document.getElementById("animatedTextSection");
            if (target) {
                const position = target.getBoundingClientRect();
                setIsInView(position.top < window.innerHeight);
            }
        };

        window.addEventListener("scroll", checkIfInView);
        return () => window.removeEventListener("scroll", checkIfInView);
    }, []);

    return (
        <section id="features" className="h-screen w-full bg-black">
            <div className="flex flex-grow flex-col w-full items-center bg-opacity-0 pt-16 mb-6 rounded-b-[40px] pb-10 bg-transparent">
                <div className="pt-6 flex items-center justify-center mt-10 mb-60 bg-transparent">
                    <Image src={Sparkles} alt="Sparkles" width={100} height={100} />
                    <div className="w-1/2 bg-transparent">
                        <p className="font-inter font-interRegular text-2xl mt-6 text-center text-white ml-4">
                            Shape your success with our AI-powered tool, customize it to fit
                            seamlessly into your business vision.
                        </p>
                    </div>
                </div>
                <div id="animatedTextSection" className="relative bg-transparent">
                    <p className={`absolute text-center text-6xl w-full font-bold text-white bg-clip-text opacity-80 top-1/2 left-1/2 transform -translate-x-1/2 ${isInView ? "-translate-y-80" : "-translate-y-1/2"} transition-all duration-700 ease-in-out`}>
                        Manage your client base with Chat genie
                    </p>
                    <div className="flex items-center justify-center space-x-10 bg-transparent">
                        <FeatureCard image={Calendar} alt="Calendar" text="Empower Your Time: Delegate Scheduling, Elevate Success." />
                        <FeatureCard image={Voice} alt="Voice" text="Effortlessly Manage Your Calls with AI: Smart, Simplified, Streamlined." />
                        <FeatureCard image={Dashboard} alt="Dashboard" text="Smart Dashboard: Revolutionizing Business Management with a Single Click." />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
