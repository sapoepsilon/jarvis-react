interface LoginButtonProps {
  text: string;
  onClick?: () => void;
}
const LoginButton: React.FC<LoginButtonProps> = ({ text, onClick }) => {
  return (
    <span
      onClick={() => {
        onClick;
      }}
      className="py-2 font-medium text-linear-gradient-start px-5 bg-white rounded-3xl hover:bg-accent-purple hover:text-white transition duration-300 cursor-pointer hover:text-chatgenie-primary"
    >
      {text}
    </span>
  );
};

export default LoginButton;
