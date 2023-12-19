import Logo from "@/components/navbar/NavBarLogo";
import React, { useEffect, useState } from "react";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import NavbarItem from "@/components/navbar/NavBarItem";
import { useRouter } from "next/router";

<<<<<<< HEAD
type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const handleScroll = () => {
      const sections = ["home", "features", "services", "pricing", "support"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <nav className={`${className} bg-gradient-to-r from-blue-500 via-purple-950 to-accent-purple shadow-lg sticky top-0 z-50 bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter overflow-hidden`}>
        <div className="flex justify-between w-screen px-4">
          <div className="flex justify-between items-center w-full px-10">
            <div className="flex space-x-7 items-center">
              <Logo/>
            </div>
            <div className="hidden md:flex items-center space-x-1 mx-auto">
              {["Home", "Features", "Services", "Pricing", "Support"].map(
                  (item, index) => (
                      <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.toLowerCase());
                          }}
                      >
                        <NavbarItem
                            title={item}
                            isActive={activeSection === item.toLowerCase()}
                        />
                      </button>
                  )
              )}
            </div>
            <button
                className="md:hidden"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {/* Icon or Text for Menu Toggle */}
            </button>
            <div className="hidden md:flex items-center space-x-3">
              <LoginButton text="Demo" />
              <LoginButton text="Login" />
            </div>
            {isDropdownOpen && isMobile && (
                <div className="absolute w-full bg-white shadow-md md:hidden">
                  {["Home", "Features", "Services", "Pricing", "Support"].map(
                      (item, index) => (
                          <button
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.toLowerCase());
                              }}
                          >
                            <NavbarItem
                                title={item}
                                isActive={activeSection === item.toLowerCase()}
                            />
                          </button>
                      )
                  )}
                </div>
            )}
=======
const Navbar = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Define the IDs of your sections
      const sections = ["home", "features", "services", "pricing", "support"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className="bg-transparent shadow-lg sticky top-0 z-50 bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter overflow-hidden">
      <div className="flex justify-between  w-screen px-4">
        <div className="flex justify-between  items-center w-full px-10">
          {/* Logo and navbar items container */}

          <div className="flex space-x-7 items-center">
            {/* Use the Logo component */}
            <Logo />
          </div>
          {/* Centered div for the Navbar items */}
          <div className="hidden md:flex items-center space-x-1 mx-auto">
            {/* Use the NavbarItem component for each item */}
            {/* <NavbarItem href="/features" title="Features" />
            <NavbarItem href="/services" title="Services" />
            <NavbarItem href="/pricing" title="Pricing" />
            <NavbarItem href="/support" title="Support" />
            <NavbarItem href="LandingPage" title="Landing" /> */}
            {["Home", "Features", "Services", "Pricing", "Support"].map(
              (item, index) => (
                <NavbarItem
                  key={index}
                  title={item}
                  isActive={activeSection === item.toLowerCase()}
                />
              )
            )}
          </div>
          <button
            className="md:hidden" // Visible only on mobile
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {/* Icon or Text for Menu Toggle */}
          </button>

          {/* Login button container */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Use the LoginButton component */}
            <LoginButton text="Demo" />
            <LoginButton text="Login" />
>>>>>>> 08c3461 (feat: Added Animation)
          </div>
          {isDropdownOpen && (
            <div className="absolute w-full bg-white shadow-md md:hidden">
              {["Home", "Features", "Services", "Pricing", "Support"].map(
                (item, index) => (
                  <NavbarItem
                    key={index}
                    title={item}
                    isActive={activeSection === item.toLowerCase()}
                  />
                )
              )}
            </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;