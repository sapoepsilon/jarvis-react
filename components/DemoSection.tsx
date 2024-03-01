const DemoSection: React.FC = () => {
    return (
        <section id="demo" className="w-full h-screen bg-black mt-1">
            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-6xl text-white">Demo</h1>
                <iframe src="https://www.youtube.com/embed/4Wa5DivljOM" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen></iframe>
            </div>
        </section>
    );
};

export default DemoSection;
