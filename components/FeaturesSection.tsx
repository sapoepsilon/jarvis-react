import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Calendar from "../public/calendar.svg";
import Dashboard from "../public/dashboard.svg";
import Voice from "../public/voice.svg";

const FeatureCard: React.FC<{
  image: StaticImageData;
  alt: string;
  text: string;
  description?: string;
}> = ({ image, alt, text, description }) => {
  const defaultStyle = {
    background: "linear-gradient(to right, #3498db, #8e44ad)",
  };

  const [gradientStyle, setGradientStyle] = useState(defaultStyle);
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { clientX, clientY, currentTarget } = event;
    const { top, left, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    const newStyle = {
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, #3498db, #8e44ad)`,
    };
    setGradientStyle(newStyle);
  };

  return (
    <div
      id="gradientBox"
      className="w-80 h-70 rounded-2xl border mb-5 mx-2 border-black bg-opacity-80 hover:bg-opacity-50 backdrop-blur-md bg-clip-padding backdrop-filter overflow-hidden"
      style={gradientStyle}
      onMouseMove={handleMouseMove}
    >
      <div className="m-4 flex flex-col items-center h-full">
        <Image src={image} alt={alt} width={50} height={50} />
        <p className="text-white font-inter font-interRegular text-xl mt-2 whitespace-normal overflow-hidden">
          {text}
        </p>
        <p className="text-white font-inter font-interRegular text-md mt-2 whitespace-normal overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.3,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  const getAnimationClass = () => {
    return isInView ? "animate-slideUp" : "animate-slideDown";
  };

  return (
    <section id="features" className="w-full bg-black ">
      <div className="flex flex-grow flex-col lg:h-screen w-full items-center  px-10 bg-opacity-0 rounded-b-[40px] bg-transparent">
        <div className="flex flex-col items-center justify-center sm:mb-20 md:mb-20 lg:mb-30 bg-transparent">
          <div
            ref={ref}
            id="animatedTextSection"
            className="relative bg-transparent"
          >
            <p
              className={`font-inter font-interRegular text-2xl mt-6 text-center text-white ${getAnimationClass()}`}
            >
              Shape your success with our AI-powered tool, customize it to fit
              seamlessly into your business vision.
            </p>
            <p
              className={`ext-center text-center pt-10  lg:text-6xl mb-10 md:text-5xl text-3xl font-bold text-white bg-clip-text opacity-80 ${getAnimationClass()} `}
            >
              Manage your client base with Chat genie
            </p>
          </div>
        </div>
        <div
          ref={ref}
          id="animatedTextSection"
          className="relative bg-transparent"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-y-0 items-center justify-center bg-transparent">
            <FeatureCard
              image={Calendar}
              alt="Calendar"
              text="Empower Your Time: Seamless Scheduling Across Platforms"
              description="Integrate ChatGenie with your existing calendar tools to effortlessly book and manage customer appointments. Say goodbye to double bookings and scheduling conflicts."
            />
            <FeatureCard
              image={Voice}
              alt="Voice"
              text="Effortlessly Manage Your Calls with AI: Smart, Simplified, Streamlined."
              description="Utilize our AI-powered voice system for realistic, natural conversations. Handle customer calls with ease, offering a seamless and personalized experience."
            />
            <FeatureCard
              image={Dashboard}
              alt="Dashboard"
              text="Smart Dashboard: Revolutionizing Business Management with a Single Click."
              description="Our smart dashboard gives you a comprehensive overview of your appointments, customer interactions, and more - all accessible with a click."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
