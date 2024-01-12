import Logo from "@/components/navbar/NavBarLogo";
import React, { useState } from "react";
import LoginButton from "@/components/navbar/LoginButtonNavBar";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

const Navbar = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  
  return (
    <nav className="bg-transparent shadow-lg">
      <div className="flex justify-center w-screen px-4 md:justify-between">
        <div className="flex items-center justify-center w-full px-10 md:justify-between">
          {/* Logo and navbar items container */}

          <div className="flex space-x-7 items-center justify-center md:justify-start relative">
          <div className="flex space-x-7 items-center justify-center md:justify-start relative">
            <div 
                className="logo-hover-effect"
                onMouseEnter={() => setIsHovered(true) }
                onMouseLeave={() => setIsHovered(false)}
            >
                <Logo />
            </div>
            <div 
                id="beta-div"
                className={`absolute top-4 right-11 bg-black bg-opacity-80 text-yellow-600 text-xs px-1 font-mono backdrop-blur-sm flip-on-hover`}
                style={{ 
                    transition: 'transform 0.6s', 
                    transformStyle: 'preserve-3d' 
                }}
            >
                beta
            </div>
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
