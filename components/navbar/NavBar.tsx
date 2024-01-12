import Logo from "@/components/navbar/NavBarLogo";
import React from "react";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-transparent shadow-lg">
      <div className="flex justify-center w-screen px-4 md:justify-between">
        <div className="flex items-center justify-center w-full px-10 md:justify-between">
          {/* Logo and navbar items container */}

          <div className="flex space-x-7 items-center justify-center md:justify-start relative">
            <Logo />
            <div className="absolute top-3 right-[-1.1rem] bg-black bg-opacity-80 text-yellow-600  text-xs px-1 font-mono backdrop-blur-sm">
              beta
            </div>
          </div>
          {/* Login button container */}
          <div className="hidden md:flex items-center space-x-3">
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
