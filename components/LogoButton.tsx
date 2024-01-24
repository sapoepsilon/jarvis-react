import Image from 'next/image';

export const LogoButton = () => {
  return (
    <div className="relative h-full w-full">
      <a className="block h-full w-full rounded-lg shadow-lg bg-black hover:bg-opacity-90">
        <Image
          src="/BG.png"
          fill={true}
          style={{ objectFit: "cover" }}
          className="rounded-lg"
          alt="Your Image Description"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <p className="text-white text-xl font-bold">VIUS</p>
        </div>
      </a>
    </div>
  );
};
