import React, { useRef, useEffect } from 'react';
import Sparkles from '../public/sparkles.svg';
import Image from 'next/image';

const RotatingLogo: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angleX = 0;
    let angleY = 0;

    const rotateLogo = (timestamp: number) => {
      if (logoRef.current) {
        logoRef.current.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      }

      angleX += 1; // Adjust the rotation speed as needed
      angleY += 1;

      requestAnimationFrame(rotateLogo);
    };

    const animationId = requestAnimationFrame(rotateLogo);

    return () => {
      // Cleanup
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={logoRef} className="relative w-20 h-20">
      <Image src={Sparkles} alt="Logo" width={50} height={50} />
    </div>
  );
};

export default RotatingLogo;
