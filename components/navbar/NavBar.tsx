import Logo from "@/components/navbar/NavBarLogo";
import React from "react";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import NavbarItem from "@/components/navbar/NavBarItem";

const Navbar = () => {
    return (
        <nav className="bg-transparent shadow-lg">
            <div className="flex justify-between justify-center w-screen px-4">
                <div className="flex justify-between justify-between items-center w-full md:max-w-6xl">
                    {/* Logo and navbar items container */}

                    <div className="flex space-x-7 items-center">
                        {/* Use the Logo component */}
                        <Logo />
                    </div>
                        {/* Centered div for the Navbar items */}
                        <div className="hidden md:flex  items-center space-x-1 mx-auto">
                            {/* Use the NavbarItem component for each item */}
                            <NavbarItem href="/features" title="Features" />
                            <NavbarItem href="/services" title="Services" />
                            <NavbarItem href="/pricing" title="Pricing" />
                            <NavbarItem href="/support" title="Support" />
                        </div>
                    {/* Login button container */}
                    <div className="hidden md:flex items-center space-x-3">
                        {/* Use the LoginButton component */}
                        <LoginButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
