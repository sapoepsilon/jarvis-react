import { useRouter } from "next/router";

type NavbarItemProps = {
  href?: string;
  title: string;
  isActive: boolean;
};

const NavbarItem = ({ href, title, isActive }: NavbarItemProps) => {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
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
                  ? "navbar-item-active text-white bg-purple-900 bg-opacity-25 text-lg"
                  : "navbar-item text-white hover:text-accent-purple"
          }`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(title.toLowerCase());
          }}
      >
        {title}
      </a>
  );
};

export default NavbarItem;
