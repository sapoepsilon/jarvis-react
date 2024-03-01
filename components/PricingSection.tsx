const PricingSection: React.FC = () => {
  return (
    <div id="pricing" className="flex flex-col h-screen">
      {/* Navigation Header */}
      <header className="w-full py-4 bg-black text-white flex justify-center">
        <h2 className="text-4xl font-bold">Pricing</h2>
      </header>
      {/* Main Content Section */}
      <section className="flex-grow flex justify-center items-center bg-black">
        <div className="text-center text-white">
          <p className="text-3xl mt-4">Coming soon...</p>
        </div>
      </section>
    </div>
  );
};

export default PricingSection;
