import Navbar from "@/components/navbar/NavBar";
import React from "react";
import Logo from "../public/logo-svg.svg";
import Image from "next/image";
import Sparkles from "../public/sparkles.svg";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import RotatingLogo from "@/components/RotatingLogo";
import { useRouter } from "next/router";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const handleExploreClick = () => {
    // Use smooth scrolling to scroll to the target section
    document
      .getElementById("targetSection")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen  bg-gradient-to-b from-linear-gradient-start to-linear-gradient-end flex flex-col items-center">
      <Navbar />
      <div className="flex flex-grow flex-col items-center justify-center pt-16 pb-6 rounded-b-[40px] bg-gradient-to-b from-linear-gradient-start to-accent-purple">
        <Image src={Logo} alt="Logo" width={50} height={50} />

        <div className="w-1/2">
          <p className="font-inter font-interBold text-6xl mt-6 text-center bg-gradient-to-r from-blue-500 via-white to-accent-purple text-transparent bg-clip-text">
            Automate boring aspects of small businesses with ChatGeanie
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
      <div className="flex flex-grow flex-col w-full items-center pt-16 mb-6 rounded-b-[40px] pb-10 bg-gradient-to-b from-linear-gradient-start to-orange-500">
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
        <div className="pt-10 relative ">
          {/* Large Text Behind */}
          <p className="absolute text-6xl w-full font-bold text-white opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Large Text Behind more text more text
          </p>

          {/* Div Elements with Glassmorphism Style */}
          <div className="flex items-center justify-center space-x-10">
            <div className="w-80 h-64 rounded-2xl border border-white bg-opacity-5 backdrop-blur-sm bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-xl overflow-hidden">
              <div className="m-4">
                <p className="text-white font-inter font-interRegular text-xl">
                  Manage
                </p>
              </div>
            </div>
            <div className="w-80 h-64 rounded-2xl border border-white bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-xl overflow-hidden">
              <div className="m-4">
                <p className="text-white font-inter font-interRegular text-xl">
                  Manage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
