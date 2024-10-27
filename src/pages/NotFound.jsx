// NotFound.js
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="mb-6 text-6xl font-semibold">404</h1>
      <p className="mb-4 text-xl font-semibold">Page Not Found</p>
      <p className="opacity-80">Sorry, the page you{`'`}re looking for doesn{`'`}t exist.</p>
      <button onClick={() => navigate("/")} className="mt-6 font-semibold underline text-sky-600">Go back to Home</button>
    </div>
  );
}

export default NotFound;
