import React from 'react';
import Image from 'next/image';
import router from 'next/router';
import LoginButton from './navbar/LoginButtonNavBar';
import Logo from "../public/logo-svg.svg";
import PulsatingBackground from "@/components/pulsating/PulsatingBackground";

const HomeSection: React.FC = () => {
  const handleExploreClick = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
      <section id="home" className="bg-opacity-0 flex flex-grow flex-col min-h-screen w-full -mt-20">
          <PulsatingBackground className="absolute inset-0"/>
          <div className="flex flex-grow flex-col w-full min-h-screen items-center justify-center z-10 rounded-b-[40px] ">

          <Image  src={Logo} alt="Logo" width={50} height={50} />
          <div className="w-1/2">
            <p className="font-inter font-interBold lg:text-6xl sm:text-lg mt-6 mb-2 text-center bg-gradient-to-r from-blue-500 via-black to-accent-purple text-transparent bg-clip-text">
              Automate scheduling of your business
            </p>
              <p className="font-inter font-interRegular text-2xl pt-6 text-center text-black">
              <span className="bg-white rounded p-2">
                Handle bureaucratic nature of doing small business, and help customer facing side of business AI
              </span>
              </p>
          </div>
            <div className="mt-10 space-x-2 mb-10">
                <LoginButton textSize="xl" text="Explore" onClick={handleExploreClick}/>
                <LoginButton textSize="xl" text="Demo" onClick={() => router.push('/demo')} />
          </div>
        </div>
      </section>
  );
};

export default HomeSection;