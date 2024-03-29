import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar/NavBar";
import HomeSection from "../components/HomeSestion";
import Features from "../components/FeaturesSection";
import Sparkles from "../public/sparkles.svg";
import PricingSection from "@/components/PricingSection";
import DemoSection from "@/components/DemoSection";
import JoinWaitlistSection from "@/components/WaitlistSection";
const LandingPage: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false);
  let lastScrollY = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setShowNavbar(currentScrollY < lastScrollY || currentScrollY === 0);
    setIsMobileNavbarOpen(false)
    lastScrollY = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center relative">
      <Navbar
        showNavbar={showNavbar}
        isNavbarExpanded={isMobileNavbarOpen}
        setIsNavbarExpanded={setIsMobileNavbarOpen}
      />
      <HomeSection />
      <Features />
      <DemoSection />
      <JoinWaitlistSection />
      <PricingSection />
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
