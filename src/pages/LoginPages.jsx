import { useState } from "react";
import store from "../state/store";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PasswordInput from "../components/PasswordInput";
import { ToastContainer } from "react-toastify";

function LoginPage() {
  const login = store((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const isLogin = await login(email, password);
    setTimeout(() => {
      isLogin && navigate("/");
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen bg-gray-50">
        <div className="sm:w-[450px] w-[310px]">
          <form
            className="flex flex-col w-full gap-4 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md sm:gap-6 sm:p-10"
            onSubmit={handleLogin}
          >
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-semibold text-center sm:text-4xl">
                Welcome
              </h1>
              <p className="text-sm text-center sm:text-md opacity-80">
                I’m happy to have you back!
              </p>
            </div>
            <TextField
              className=""
              value={email}
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="true"
            />
            <PasswordInput password={password} setPassword={setPassword} />
            <button
              className="py-4 mt-4 font-semibold text-white bg-purple-500 rounded hover:bg-purple-600 active:bg-purple-500"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="flex justify-end mt-2">
            <p>
              Don{`'`}t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={1500} />
    </>
  );
}

export default LoginPage;
