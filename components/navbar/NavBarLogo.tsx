import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo-svg.svg"; // Make sure the path is correct

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center cursor-pointer hover:opacity-50"
    >
      <Image src={logo} alt="Logo" width={40} height={40} />
      <span className="font-semibold text-white px-2 text-lg">Chat genie</span>
    </div>
  );
};

export default Logo;
