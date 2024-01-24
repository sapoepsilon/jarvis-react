import React from 'react';
import { FaBars } from 'react-icons/fa';

export const HamburgerMenuButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
}> = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className="hamburger-button">
      <FaBars className={`hamburger-icon ${isOpen ? 'rotate-90' : ''}`} />
    </button>
  );
};
