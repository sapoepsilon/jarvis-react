import { useRouter } from 'next/router';

const LoginButton = () => {
    const router = useRouter();

    return (
        <span onClick={() => router.push('/login')} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300 cursor-pointer hover:text-chatgenie-primary">
      Log In
    </span>
    );
};

export default LoginButton;
