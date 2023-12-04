import Logo from "@/components/navbar/NavBarLogo";
import React from "react";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import NavbarItem from "@/components/navbar/NavBarItem";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-transparent shadow-lg">
      <div className="flex justify-between justify-center w-screen px-4">
        <div className="flex justify-between justify-between items-center w-full px-10">
          {/* Logo and navbar items container */}

          <div className="flex space-x-7 items-center">
            {/* Use the Logo component */}
            <Logo />
          </div>
          {/* Centered div for the Navbar items */}
          <div className="hidden md:flex items-center space-x-1 mx-auto">
            {/* Use the NavbarItem component for each item */}
            <NavbarItem href="/features" title="Features" />
            <NavbarItem href="/services" title="Services" />
            <NavbarItem href="/pricing" title="Pricing" />
            <NavbarItem href="/contact" title="Contact us" />
            <NavbarItem href="LandingPage" title="Landing" />
          </div>
          {/* Login button container */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Use the LoginButton component */}
            <LoginButton text="Demo" />
            <LoginButton text="Login" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
