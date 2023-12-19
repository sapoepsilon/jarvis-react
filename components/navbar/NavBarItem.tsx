import { useRouter } from "next/router";

type NavbarItemProps = {
  href?: string;
  title: string;
  isActive: boolean;
};

const NavbarItem = ({ href, title, isActive }: NavbarItemProps) => {
  const router = useRouter();
<<<<<<< HEAD

  const scrollToSection = (sectionId: string) => {
=======
  const scrollToSection = (sectionId: any) => {
>>>>>>> 08c3461 (feat: Added Animation)
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
<<<<<<< HEAD

  return (
      <a
          href={`#${title.toLowerCase()}`}
          className={`px-3 py-2 rounded-md text-md font-medium ${
              isActive
                  ? "navbar-item-active text-white bg-accent-purple text-lg"
                  : "navbar-item text-white hover:text-accent-purple"
          }`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(title.toLowerCase());
          }}
      >
        {title}
      </a>
=======
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
>>>>>>> 08c3461 (feat: Added Animation)
  );
};

export default NavbarItem;
