import { useRouter } from "next/router";

type NavbarItemProps = {
  href?: string;
  title: string;
  isActive: boolean;
};

const NavbarItem = ({ href, title, isActive }: NavbarItemProps) => {
  const router = useRouter();
  const scrollToSection = (sectionId: any) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <a
      href={`#${title.toLowerCase()}`}
      className={`px-3 py-2 rounded-md text-md font-medium ${
        isActive
          ? "text-white text-lg hover:text-accent-purple"
          : "text-white hover:text-accent-purple"
      }`}
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        scrollToSection(title.toLowerCase()); // Convert title to ID and scroll to the section
      }}
    >
      {title}
    </a>
    // <span
    //   onClick={() => router.push(href)}
    //   className="py-4 px-2 text-white font-semibold hover:text-xl cursor-pointer "
    // >
    //   {title}
    // </span>
  );
};

export default NavbarItem;
