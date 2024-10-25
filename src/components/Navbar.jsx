import logo from "../assets/logo.png"

function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between w-full h-20 bg-white px-[5%] sticky top-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <img className="w-8 " src={logo} alt="website logo" />
          <h1 className="text-2xl font-semibold ">Dynamic Form Builder</h1>
        </div>
        <div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;