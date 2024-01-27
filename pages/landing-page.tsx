import Navbar from "@/components/navbar/NavBar";

import React, { useEffect, useState } from "react";
import Logo from "../public/logo-svg.svg";
import Calendar from "../public/calendar.svg";
import Dashboard from "../public/dashboard.svg";
import Voice from "../public/voice.svg";
import Image from "next/image";
import Sparkles from "../public/sparkles.svg";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import RotatingLogo from "@/components/RotatingLogo";
import { useRouter } from "next/router";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const handleExploreClick = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };
  const [isInView, setIsInView] = useState(false);

  const checkIfInView = () => {
    const target = document.getElementById("animatedTextSection");
    if (target) {
      const position = target.getBoundingClientRect();
      setIsInView(position.top < window.innerHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkIfInView);
    return () => window.removeEventListener("scroll", checkIfInView);
  }, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-linear-gradient-start to-linear-gradient-end flex flex-col items-center">
      <Navbar />
      <section
        id="home"
        className="flex flex-grow flex-col min-h-screen w-full-mt-20"
      >
        <div className="flex flex-grow flex-col w-full min-h-screen items-center justify-center z-10 rounded-b-[40px] bg-gradient-to-b from-linear-gradient-start to-linear-gradient-end">
          <Image src={Logo} alt="Logo" width={50} height={50} />

          <div className="w-1/2">
            <p className="font-inter font-interBold text-6xl mt-6 text-center bg-gradient-to-r from-blue-500 to-accent-purple text-transparent bg-clip-text">
              Automate boring aspects of small businesses with Chat genie
            </p>
            <p className="font-inter font-interRegular text-2xl pt-6 text-center text-white">
              Handle bureaucratic nature of doing small business, and help
              customer facing side of business AI
            </p>
          </div>
          <div className="mt-10 space-x-2 mb-10">
            <LoginButton
              textSize="xl"
              text="Explore"
              onClick={handleExploreClick}
            />
            <LoginButton
              textSize="xl"
              text="Demo"
              onClick={() => router.push("./pages/index.tsx")}
            />
          </div>
        </div>
      </section>

      <section id="features" className="h-screen w-full">
        <div className="flex flex-grow flex-col w-full items-center pt-16 mb-6 rounded-b-[40px] -mt-40 pb-10 bg-gradient-to-b  from-linear-gradient-start to-linear-gradient-end">
          <div className="pt-6 flex items-center justify-center mt-60 mb-60">
            <Image src={Sparkles} alt="Sparkles" width={100} height={100} />
            <div className="w-1/2">
              <p className="font-inter font-interRegular text-2xl mt-6 text-center text-white ml-4">
                Shape your success with our AI-powered tool, customize it to fit
                seamlessly into your business vision.
              </p>
            </div>
          </div>
          <div id="animatedTextSection" className=" relative ">
            {/* Large Text Behind */}
            {/* <p className="absolute  text-center text-6xl w-full font-bold text-white opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> */}
            <p
              className={`absolute text-center text-6xl w-full font-bold text-white opacity-80 top-1/2 left-1/2 transform -translate-x-1/2 ${
                isInView ? "-translate-y-80" : "-translate-y-1/2"
              } transition-all duration-700 ease-in-out`}
            >
              Manage your clientbase with Chat genie
            </p>

            {/* Div Elements with Glassmorphism Style */}
            <div className="flex items-center justify-center space-x-10">
              <div className="w-80 h-64 rounded-2xl border border-white bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter overflow-hidden">
                <div className="m-4">
                  <Image src={Calendar} alt="Logo" width={50} height={50} />
                  <p className="text-white font-inter font-interRegular text-xl">
                    Empower Your Time: Delegate Scheduling, Elevate Success.
                  </p>
                </div>
              </div>
              <div className="w-80 flex justify-center h-64 rounded-2xl border border-white bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter overflow-hidden">
                <div className="flex m-4 justify-center items-center">
                  <p className="text-white font-inter font-interRegular text-xl">
                    <Image src={Voice} alt="Logo" width={50} height={50} />
                    Effortlessly Manage Your Calls with AI: Smart, Simplified,
                    Streamlined.
                  </p>
                </div>
              </div>
              <div className="w-80 h-64 rounded-2xl border border-white bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter overflow-hidden">
                <div className="m-4">
                  <p className="text-white font-inter font-interRegular text-xl">
                    <Image src={Dashboard} alt="Logo" width={50} height={50} />
                    Smart Dashboard: Revolutionizing Business Management with a
                    Single Click.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="h-screen">
        {" "}
        {/* Services Section Content */}
      </section>
      <section id="pricing" className="h-screen">
        {" "}
        {/* Pricing Section Content */}
      </section>
      <section id="support" className="h-screen">
        {" "}
        {/* Support Section Content */}
      </section>
      <div
        id="targetSection"
        className="pt-6 flex items-center justify-center "
      >
        <Image src={Sparkles} alt="Sparkles" width={100} height={100} />
        <div className="w-1/2">
          <p className="font-inter font-interRegular text-2xl mt-6 text-center text-white ml-4">
            Shape your success with our AI-powered tool, customize it to fit
            seamlessly into your business vision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
