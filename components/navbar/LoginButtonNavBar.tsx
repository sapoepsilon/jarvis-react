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

const LoginButton: React.FC<LoginButtonProps> = ({
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
      className={`py-2 px-5 bg-white rounded-3xl hover:bg-accent-purple hover:text-white text-linear-gradient-start font-medium transition duration-300 cursor-pointer ${buttonClasses}`}
    >
      {text}
    </span>
  );
};
export default LoginButton;
// import { cva, type VariantProps } from "class-variance-authority";

// interface LoginButtonProps {
//   text: string;
//   onClick?: () => void;
//   textSize: string;
// }
// const LoginButton: React.FC<LoginButtonProps> = ({
//   text,
//   onClick,
//   textSize,
// }) => {
//   return (
//     <span
//       onClick={() => {
//         onClick;
//       }}
//       className={`py-2 text-${textSize} font-medium text-linear-gradient-start px-5 bg-white rounded-3xl hover:bg-accent-purple hover:text-white transition duration-300 cursor-pointer hover:text-chatgenie-primary`}
//     >
//       {text}
//     </span>
//   );
// };

// export default LoginButton;
