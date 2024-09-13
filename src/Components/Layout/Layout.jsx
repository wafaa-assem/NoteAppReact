import { Footer } from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Navbar } from "./../Navbar/Navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="py-10 bg-gray-100 px-6  ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

// el shape el hyfdal mawgod 3alatol => ersemeh zay mnty 3ayza
