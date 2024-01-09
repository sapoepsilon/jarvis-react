import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo.png"; // Make sure the path is correct

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center py-4 px-2 cursor-pointer"
    >
      <Image src={logo} alt="Logo" width={200} height={50} />
    </div>
  );
};

export default Logo;
