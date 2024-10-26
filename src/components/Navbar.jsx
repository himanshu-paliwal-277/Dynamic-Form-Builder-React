import { useState } from "react";
import logo from "../assets/logo.png";
import store from "../state/store";
import LogoutButton from "./LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  const { user } = store();
  const [showPopup, setShowPopup] = useState(false);
  function togglePopup() {
    setShowPopup(!showPopup);
  }
  return (
    <>
      <nav className=" flex items-center justify-between w-full h-20 bg-white px-[5%] sticky top-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <img className="w-8 " src={logo} alt="website logo" />
          <h1 className="text-2xl font-semibold ">Dynamic Form Builder</h1>
        </div>
        <div className="">
          <div
            onClick={() => togglePopup()}
            className={`w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center font-bold cursor-pointer`}
            title={user?.username}
          >
            {user?.username && user.username.split(" ").length >= 2
              ? user.username.split(" ")[0][0] + user.username.split(" ")[1][0]
              : // Fallback content, like "NA" or any placeholder you prefer
                "NA"}
          </div>
          <div className={`flex flex-col items-center absolute top-24 right-8 bg-white py-6 px-8 shadow-xl rounded-lg  ${showPopup ? "block" : "hidden"}`}>
          <FontAwesomeIcon className="absolute text-sm scale-125 cursor-pointer opacity-30 hover:opacity-70 top-5 right-5" onClick={togglePopup} icon={faXmark} />
            <div className="flex items-center justify-center w-20 h-20 text-xl font-bold bg-gray-200 rounded-full">
            {user?.username && user.username.split(" ").length >= 2
              ? user.username.split(" ")[0][0] + user.username.split(" ")[1][0]
              : // Fallback content, like "NA" or any placeholder you prefer
                "NA"}
            </div>
            <h1 className="my-2 text-xl">{user ? "Hi, " + user?.username.split(" ")[0] + "!" : "NA"}</h1>
            <LogoutButton />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
