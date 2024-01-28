import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaBars } from 'react-icons/fa';
import { scrollToSection } from "@/utils/scrollToSection";
import { renderNavbarItems } from "./renderNavbarItems";
import Logo from "./navBarLogo";
import NavbarItem from "./navBarItem";
import JarvisButton from "./loginButtonNavBar";

type NavbarProps = {
  className?: string;
  isNavbarExpanded?: boolean;
  setIsNavbarExpanded?: (value: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ className, isNavbarExpanded, setIsNavbarExpanded }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const defaultStyle = {
    background: "linear-gradient(to right, #3498db, #8e44ad)",
  };
  const [gradientStyle, setGradientStyle] = useState(defaultStyle);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { clientX, clientY, currentTarget } = event;
    const { top, left, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    const newStyle = {
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, #3498db, #8e44ad)`,
    };
    setGradientStyle(newStyle);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

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

  return (
    <nav
      className={`md:${className} lg:${className} shadow-lg sticky top-0 z-50 bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter overflow-hidden ${isNavbarExpanded ? 'h-auto' : 'h-50px'}`}
      style={{ ...gradientStyle }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="flex flex-col md:flex-row justify-between w-screen px-4"
      >
        <div className="flex justify-start md:justify-between sm:justify-between items-center w-full px-10">
          <div className="flex space-x-7 items-center">
            <button
              className="md:hidden text-white hover:opacity-50"
              onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
            >
              <FaBars />
            </button>
            <Logo />
          </div>
          <div className={`${isNavbarExpanded ? 'hidden ' : 'sm: hidden lg:block md:block'} mt-4 sm:mt-0`}>
            {renderNavbarItems(["Home", "Features", "Services", "Pricing", "Support"], activeSection)}
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <JarvisButton text="Demo" onClick={() => router.push("/Demo")} />
            <JarvisButton text="Login" onClick={() => router.push("/Login")} />
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
                ),
              )}
            </div>
          )}
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
              ),
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
