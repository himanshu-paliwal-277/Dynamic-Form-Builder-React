import logo from "../assets/logo.png";
import UserProfile from "./UserProfile";

function Navbar() {
  
  return (
    <>
      <nav className=" flex items-center justify-between w-full h-20 bg-white px-[5%] sticky top-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <img className="w-8 " src={logo} alt="website logo" />
          <h1 className="text-2xl font-semibold ">Dynamic Form Builder</h1>
        </div>
        {/*  */}
        <div className="">
          <UserProfile />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
