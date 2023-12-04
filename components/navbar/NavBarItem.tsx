import { useRouter } from "next/router";

type NavbarItemProps = {
  href: string;
  title: string;
};

const NavbarItem = ({ href, title }: NavbarItemProps) => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push(href)}
      className="py-4 px-2 text-white font-semibold hover:text-xl cursor-pointer "
    >
      {title}
    </span>
  );
};

export default NavbarItem;
