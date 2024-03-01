// NavBar.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa";
import { renderNavbarItems } from "./renderNavbarItems";
import NavbarItem from "./NavBarItem";
import JarvisButton from "./JarvisButton";
import { scrollToSection } from "../../utils/scrollToSection";

type NavbarProps = {
  className?: string;
  isNavbarExpanded?: boolean;
  setIsNavbarExpanded?: (value: boolean) => void;
  showNavbar?: boolean; // Add this line to accept the showNavbar prop
};

const Navbar: React.FC<NavbarProps> = ({
  className,
  isNavbarExpanded,
  setIsNavbarExpanded,
  showNavbar, // Make sure to destructure the showNavbar prop here
}) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const defaultStyle = {
    background: "linear-gradient(to right, #3498db, #8e44ad)",
  };
  const [gradientStyle, setGradientStyle] = useState(defaultStyle);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const handleScroll = () => {
      const sections = ["home", "features", "pricing", "support"];
      for (const section of sections) {
        const element = document.getElementById(section);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`md:${className} lg:${className} shadow-lg sticky top-0 z-50 bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter overflow-hidden ${isNavbarExpanded ? "h-auto" : "h-50px"} ${showNavbar ? "navbar-shown" : "navbar-hidden"}`} // Use showNavbar to toggle visibility classes
      style={{ ...gradientStyle }}
    >
      <div className="flex flex-col md:flex-row justify-between w-screen px-4">
        <div className="flex justify-start md:justify-between sm:justify-between items-center w-full px-10">
          <div className="flex space-x-7 items-center">
            <button
              className="md:hidden text-white hover:opacity-50 py-2"
              onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
            >
              <FaBars />
            </button>
            <p className="text-white text-extrabold py-2">ChatGenie</p>
          </div>
          <div
            className={`${isNavbarExpanded ? "hidden " : "sm: hidden lg:block md:block"} mt-4 sm:mt-0`}
          >
            {isMobile && isNavbarExpanded ? null : renderNavbarItems(
              ["Home", "Features", "Demo", "Waitlist", "Pricing", "Support"],
              activeSection,
            )}
          </div>
          <div className="hidden md:flex items-center space-x-3 py-1 ">
            {/* <JarvisButton
              text="Demo"
              onClick={() => {
                const section = document.getElementById("demo");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            /> */}
            {/* <JarvisButton text="Login" onClick={() => router.push("/Login")} /> */}
          </div>
        </div>
        {isDropdownOpen && isMobile && (
          <div className="absolute w-full bg-white shadow-md md:hidden">
            {["Home", "Features", "Demo", "Waitlist", "Pricing", "Support"].map(
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
              ),
            )}
          </div>
        )}
        {isMobile && isNavbarExpanded && (
          <div className="flex flex-col items-start pl-7">
            {renderNavbarItems(
              ["Home", "Features", "Demo", "Waitlist", "Pricing", "Support"],
              activeSection,
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
