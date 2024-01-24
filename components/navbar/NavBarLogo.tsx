import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/BG.png";

import { useState } from 'react';
import styles from '../../styles/Logo.module.css';

const Logo = () => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const imageStyle = hover ? {
    transform: `scale(3) translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
  } : {
    transform: 'scale(1)',
  };

  return (
    <div
      onClick={() => router.push('/')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
      className="relative flex items-center py-4 px-2 cursor-pointer"
      style={{ width: 70, height: 30, perspective: "100px" }}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
        <Image
          src={logo}
          alt="Logo"
          layout="fill"
          objectFit="cover"
          className="object-cover"
          style={imageStyle}
        />
      </div>
      <div className={`${styles.textBase} absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-md font-bold`}>
        {hover ? <div className={styles.textEnter}>AI</div> : <div style={{ textAlign: 'center', fontWeight: 'normal' }}>VIUS</div>}
      </div>
    </div>
  );
};

export default Logo;
