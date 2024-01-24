import Logo from '@/components/navbar/NavBarLogo';
import React, { useState } from 'react';
import LoginButton from '@/components/navbar/LoginButtonNavBar';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { HamburgerMenuButton } from '@/components/HamburgerIconButton';

type NavbarProps = {
  onSidebarClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onSidebarClick }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openSideBar = () => {
    console.log('openSideBar');
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      onSidebarClick(); // Call after state is set
      return newIsOpen;
    });
  };

  return (
    <nav className="bg-transparent shadow-lg">
      <div className="flex justify-center w-screen px-4 md:justify-between">
        <div className="flex items-center justify-center w-full px-10 md:justify-between">
          <div className="flex space-x-7 items-center justify-center md:justify-start relative">
            <div className="flex space-x-7 items-center justify-center md:justify-start relative">
              <HamburgerMenuButton isOpen={isOpen} onClick={openSideBar} />
              <div>
                <Logo />
              </div>

              <div
                id="beta-div"
                className={`absolute top-1 right-[-2.5rem] bg-black bg-opacity-80 text-yellow-600 text-xs px-1 font-mono backdrop-blur-sm flip-on-hover`}
                style={{
                  transition: 'transform 0.6s',
                  transformStyle: 'preserve-3d',
                }}
              >
                beta
              </div>
            </div>
          </div>
          {/* Login button container */}
          <div className="lex items-center space-x-3">
            <LoginButton
              text="Sign Out"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                  console.log('Error signing out:', error.message);
                } else {
                  router.reload();
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
