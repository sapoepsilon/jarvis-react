import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo-svg.svg"; // Make sure the path is correct

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center py-4 px-2 cursor-pointer hover:opacity-50">

      <Image src={logo}  alt="Logo" width={50} height={50} />
      <span className="font-semibold text-white ml-3 text-lg">Chat genie</span>
    </div>
  );
};

export default Logo;
