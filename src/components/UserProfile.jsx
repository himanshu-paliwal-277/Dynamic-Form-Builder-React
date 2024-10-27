import { useNavigate } from "react-router-dom";
import store from "../state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

function UserProfile() {
  const { user } = store();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  function togglePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <>
      <div
        onClick={() => {
          user ? togglePopup() : navigate("/login");
        }}
        className={`w-12 h-12 ${
          user ? "bg-gray-200" : ""
        } rounded-full flex justify-center items-center font-bold cursor-pointer`}
        title={user?.username}
      >
        {user === null && (
          <button className="px-4 py-2 font-semibold border-2 rounded hover:bg-gray-100 active:bg-gray-50">
            Login
          </button>
        )}
        {user?.username && user?.username.split(" ").length >= 2
          ? user?.username.split(" ")[0][0] +
            user?.username.split(" ")[1][0].toUpperCase()
          : // Fallback content, like "NA" or any placeholder you prefer
            user?.username[0][0].toUpperCase()}
      </div>
      <div
        className={`flex flex-col items-center absolute top-24 right-8 bg-white py-6 px-8 shadow-xl rounded-lg  ${
          showPopup ? "block" : "hidden"
        }`}
        style={user ? { display: "block" } : { display: "none" }}
      >
        <FontAwesomeIcon
          className="absolute text-sm scale-125 cursor-pointer opacity-30 hover:opacity-70 top-5 right-5"
          onClick={togglePopup}
          icon={faXmark}
        />
        <div className="flex items-center justify-center w-20 h-20 text-xl font-bold bg-gray-200 rounded-full">
          {user?.username && user?.username.split(" ").length >= 2
            ? user?.username.split(" ")[0][0] + user?.username.split(" ")[1][0]
            : // Fallback content, like "NA" or any placeholder you prefer
              user?.username[0][0].toUpperCase()}
        </div>
        <h1 className="mt-2 mb-1 text-xl font-semibold">
          {user ? "Hi, " + user?.username.split(" ")[0] + "!" : "NA"}
        </h1>
        <p className="mb-2">{user ? user?.userEmail : "NA"}</p>
        <LogoutButton />
      </div>
    </>
  );
}

export default UserProfile;
