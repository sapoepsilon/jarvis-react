import React, { useEffect, useState } from "react";
import Image from "next/image";
import JarvisButton from "./navbar/JarvisButton";
import Logo from "../public/logo-svg.svg";
import { useRouter } from 'next/router';

const HomeSection: React.FC = () => {
  const [isCursorMoving, setIsCursorMoving] = useState(false);
  useEffect(() => {
    let movementTimeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsCursorMoving(true);
      clearTimeout(movementTimeout);
      movementTimeout = setTimeout(() => {
        setIsCursorMoving(false);
      }, 100); // Hide background after 1 second of inactivity
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(movementTimeout);
    };
  }, []);


  const handleExploreClick = () => {
    window.open('https://chatgenie-dashboard.vercel.app/', '_blank', 'noopener,noreferrer');
  }
  return (
    <section
      id="home"
      className="bg-opacity-0 flex flex-grow flex-col min-h-screen w-full-mt-20"
    >
      {/* {isCursorMoving && <PulsatingBackground className="absolute inset-0 hidden md:block" />} */}
      <div className="flex flex-grow flex-col w-full min-h-screen items-center md:justify-center lg:justify-center z-10 rounded-b-[40px] ">
        <Image
          src={Logo}
          alt="Logo"
          width={50}
          height={50}
          className="hidden sm:block"
        />
        <div className="md:w-1/2 lg:w-1/2">
          <p className="font-inter font-interBold text-4xl mt-6 mb-2 text-center bg-gradient-to-r from-blue-500 via-white to-accent-purple text-transparent bg-clip-text">
            Automate Your Customer Scheduling with ChatGenie
          </p>
          <p className="font-inter font-interRegular text-4xl pt-6 text-center text-white">
            <span className="bg-opacity-25 rounded p-2">
              Effortlessly manage appointments across calls, web, emails, and texts with AI.
            </span>
          </p>
        </div>
        <div className="mt-60 space-x-2 mb-10 sm:mt-10">

          <JarvisButton
            textSize="xl"
            text="Start"
            onClick={handleExploreClick}
          />

          <JarvisButton
            textSize="xl"
            text="Demo"
            onClick={() => {
              const section = document.getElementById("demo");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
