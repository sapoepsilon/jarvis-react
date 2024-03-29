import React from "react";

// LoginButton.js
const { cva } = require("class-variance-authority");

interface LoginButtonProps {
  text: string;
  onClick?: () => void;
  textSize?: string;
}

const LoginButtonStyles = cva("span", {
  variants: {
    textSize: {
      sm: ["text-sm"],
      base: ["text-base"],
      lg: ["text-lg"],
      xl: ["text-2xl", "font-bold"],
    },
  },
  defaultVariants: {
    textSize: "base",
  },
});

const JarvisButton: React.FC<LoginButtonProps> = ({
  text,
  onClick,
  textSize,
}) => {
  const buttonClasses = LoginButtonStyles({ textSize });

  return (
    <span
      onClick={() => {
        onClick && onClick(); // Invoke the onClick function if it exists
      }}
      className={`py-1 px-5 bg-white rounded-3xl hover:bg-accent-purple hover:text-white text-linear-gradient-start font-medium transition duration-300 cursor-pointer ${buttonClasses}`}
    >
      {text}
    </span>
  );
};
export default JarvisButton;
