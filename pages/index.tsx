import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar/NavBar";
import HomeSection from "../components/HomeSestion";
import Features from "../components/FeaturesSection";
import Sparkles from "../public/sparkles.svg";
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
      <Navbar className={showNavbar ? "navbar-shown" : "navbar-hidden"} isNavbarExpanded={showNavbar} setIsNavbarExpanded={setShowNavbar} />
      <div id="mobile-navbar" className={`${showNavbar ? 'flex flex-col bg-transparent opacity-100 translate-y-0 w-screen pl-12 pt-2' : 'hidden opacity-0 translate-y-5'} z-50 transition-all duration-300 ease-in-out`}>
        <p className="text-white text-lg text-left">Home</p>
        <p className="text-white text-lg text-left">Features</p>
        <p className="text-white text-lg text-left">Services</p>
        <p className="text-white text-lg text-left">Pricing</p>
        <p className="text-white text-lg text-left">Support</p>
      </div>

      <HomeSection />
      <Features />
      <section id="services" className="h-auto w-auto"></section>
      <section id="pricing" className="h-screen w-auto"></section>
      <section id="support" className="h-screen w-auto"></section>
      <div
        id="targetSection"
        className="pt-6 flex flex-col sm:flex-row items-center justify-center"
      >
        <Image src={Sparkles} alt="Sparkles" width={100} height={100} />
        <div className="w-full md:w-1/2">
          <p className="font-inter font-interRegular text-lg md:text-2xl mt-6 text-center text-white ml-4">
            Shape your success with our AI-powered tool, customize it to fit
            seamlessly into your business vision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
