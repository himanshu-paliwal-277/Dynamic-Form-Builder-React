import store from "../state/store";

function LogoutButton() {
  const logout = store((state) => state.logout);

  const handleLogout = () => {
    logout();
    alert('You have been logged out');
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
