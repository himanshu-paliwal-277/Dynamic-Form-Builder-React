import { Route, Routes } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import Home from "./pages/Home";
import FormPreview from "./components/formPreview";
import FillForm from "./components/FillForm";
import Responses from "./pages/Responses";
import LoginPage from "./pages/LoginPages";
import LogoutButton from "./components/LogoutButton";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/formBuilder" element={<ProtectedRoute><FormBuilder /></ProtectedRoute>} />
        <Route path="/preview/" element={<FormPreview />} />
        {/* <Route path="/preview/:id" element={<FormPreview />} /> */}
        <Route path="/preview/:id" element={<ProtectedRoute><FormPreview /></ProtectedRoute>} />
        <Route path="/fill/:id" element={<FillForm />} />
        <Route path="/responses/:id" element={<ProtectedRoute><Responses /></ProtectedRoute>} />
      </Routes>
      {/* Add logout button on top or navbar */}
      <LogoutButton />
    </>
  );
}

export default App;
