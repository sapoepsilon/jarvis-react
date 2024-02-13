import React from "react";
import NavbarItem from "./NavBarItem";
import { scrollToSection } from "../../utils/scrollToSection";

export const renderNavbarItems = (items: string[], activeSection: string) => {
  return items.map((item, index) => (
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
  ));
};
