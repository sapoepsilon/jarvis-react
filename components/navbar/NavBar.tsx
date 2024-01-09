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

          {/* Login button container */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Use the LoginButton component */}
            <LoginButton text="Login" />
            <LoginButton text="Sign Out" onClick={() => sessionStorage.removeItem('OPENAI_API_KEY')} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
