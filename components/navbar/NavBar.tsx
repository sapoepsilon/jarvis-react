import Logo from "@/components/navbar/NavBarLogo";
import React from "react";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import NavbarItem from "@/components/navbar/NavBarItem";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-transparent shadow-lg">
      <div className="flex justify-center w-screen px-4 md:justify-between">
        <div className="flex items-center justify-center w-full px-10 md:justify-between">
          {/* Logo and navbar items container */}

          <div className="flex space-x-7 items-center justify-center md:justify-start">
            {/* Use the Logo component */}
            <Logo />
          </div>
          {/* Centered div for the Navbar items on mobile, left-aligned on larger screens */}

          {/* Login button container */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Use the LoginButton component */}
            <LoginButton text="Login" />
            <LoginButton text="Sign Out" onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.log('Error signing out:', error.message);
              } else {
                router.reload();
              }
            }} />
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
