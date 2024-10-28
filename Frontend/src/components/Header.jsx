import { Link } from "react-router-dom";
import DotButton from "./DotButton.jsx";
import Theme from "./ui/Theme.jsx";

function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center  ">
          <Link to="/" className="btn btn-ghost text-xl">
            <h1 className="text-2xl text-gray-50 ">LOGO</h1>
          </Link>
        </div>


        <div className="flex justify-center mb-2 md:mb-0">
          <h1 className="font-mono text-2xl md:text-4xl font-extrabold tracking-wide text-yellow-200">
            Wheelz Now
          </h1>
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 pr-0 md:pr-9 md:bl ">
          <Link to="/" className="btn btn-ghost">
            <h1 className="text-lg text-lime-200 italic">Home</h1>
          </Link>
          <Link to="/aboutus" className="btn btn-ghost">
            <h1 className="text-lg text-lime-200 italic">About Us</h1>
          </Link>
          <div className=" flex gap-2 display-in">
            <Theme />
            <DotButton />
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;
