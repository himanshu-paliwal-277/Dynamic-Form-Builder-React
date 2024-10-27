import logo from "../assets/logo.png";
import UserProfile from "./UserProfile";

function Navbar() {
  
  return (
    <>
      <nav className=" flex items-center justify-between w-full h-20 bg-white sm:px-[5%] px-[6%] sticky top-0 shadow-md z-10 sm:h-24">
        <div className="flex items-center gap-4">
          <img className="w-5 sm:w-8" src={logo} alt="website logo" />
          <h1 className="text-lg w-[80%] sm:w-[100%] font-semibold sm:text-2xl">Dynamic Form Builder</h1>
        </div>
        <div className="mr-0">
          <UserProfile />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
