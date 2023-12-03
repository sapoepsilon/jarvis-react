import Navbar from "@/components/navbar/NavBar";
import React from "react";
import Logo from "../public/logo-svg.svg";
import Image from "next/image";
import Sparkles from "../public/sparkles.svg";
import LoginButton from "@/components/navbar/LoginButtonNavBar";

const LandingPage: React.FC = () => {
  const handleExploreClick = () => {
    // Use smooth scrolling to scroll to the target section
    document
      .getElementById("targetSection")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-linear-gradient-start to-linear-gradient-end flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center mt-16 mb-6">
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <div className="w-1/2">
          <p className="font-inter font-interBold text-6xl mt-6 text-center bg-gradient-to-r from-blue-500 via-white to-accent-purple text-transparent bg-clip-text">
            Automate boring aspects of small businesses with Taskable
          </p>
          <p className="font-inter font-interRegular text-2xl mt-6 text-center text-white">
            Handle bureaucratic nature of doing small business, and help
            customer facing side of business AI
          </p>
        </div>

        <div className="mt-10 space-x-2">
          <LoginButton text="Explore" onClick={handleExploreClick} />
          <LoginButton text="Demo" />
        </div>

        <div id="targetSection" className="mt-6">
          <Image src={Sparkles} alt="Sparkles" width={100} height={100} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
