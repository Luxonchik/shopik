import Cart from "../components/Cart";
import DropDown from "../components/DropDown";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="bg-base-100 py-12 px-4 sm:px-6  lg:px-8">
        <HeroSection />
        <DropDown /> {/* Добавлен выпадающий список */}
        <div className="max-w-7xl mx-auto mt-10 px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
        </div>
      </div>
    </>
  );
}

export default HomePage;
