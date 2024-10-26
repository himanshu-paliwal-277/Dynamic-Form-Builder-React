import store from "../state/store";

function LogoutButton() {
  const logout = store((state) => state.logout);

  const handleLogout = () => {
    logout();
    alert('You have been logged out');
  };

  return <button className="px-4 py-1 mt-3 font-semibold border-2 rounded-full hover:bg-gray-200 active:bg-gray-300" onClick={handleLogout}>Log out</button>;
}

export default LogoutButton;
