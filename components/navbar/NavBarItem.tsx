import { useRouter } from 'next/router';

type NavbarItemProps = {
    href: string;
    title: string;
};

const NavbarItem = ({ href, title }: NavbarItemProps) => {
    const router = useRouter();

    return (
        <span onClick={() => router.push(href)} className="py-4 px-2 text-gray-500 font-semibold hover:text-chatgenie-primary cursor-pointer ">
      {title}
    </span>
    );
};

export default NavbarItem;
