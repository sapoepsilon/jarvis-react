import React, { useEffect, useState } from "react";
import Logo from "@/components/navbar/NavBarLogo";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import NavbarItem from "@/components/navbar/NavBarItem";
import { useRouter } from "next/router";
import { FaBars } from 'react-icons/fa';

type NavbarProps = {
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`md:${className} lg:${className} shadow-lg sticky top-0 z-50 bg-opacity-5 backdrop-blur-md bg-gray-100 bg-clip-padding backdrop-filter overflow-hidden ${isNavbarExpanded ? 'h-auto' : 'h-50px'}`}
      style={{ ...gradientStyle }} 
      onMouseMove={handleMouseMove} // Add mouse move event handler
    >
      <div
        className="flex flex-col md:flex-row justify-between w-screen px-4"
      >
        <div className="flex justify-start md:justify-between items-center w-full px-10">
          <div className="flex space-x-7 items-center">
            <button
              className="md:hidden"
              onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
            >
                      <FaBars />

            </button>
            <Logo />
          </div>
          <div className={`flex flex-col items-center space-y-1 mx-auto ${isNavbarExpanded ? 'block' : 'hidden'}`}>
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
          <div className="hidden md:flex items-center space-x-3">
            <LoginButton text="Demo" />
            <LoginButton text="Login" onClick={() => router.push("/Login")} />
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
