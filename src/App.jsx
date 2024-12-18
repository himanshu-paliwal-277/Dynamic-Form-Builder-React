import { Route, Routes } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import Home from "./pages/Home";
import FormPreview from "./components/formPreview";
import FillForm from "./components/FillForm";
import Responses from "./pages/Responses";
import LoginPage from "./pages/LoginPages";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FormSubmitted from "./pages/FormSubmitted";
import NotFound from "./pages/NotFound";
import 'react-toastify/dist/ReactToastify.css';

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
        <Route path="/preview/:id" element={<ProtectedRoute><FormPreview /></ProtectedRoute>} />
        <Route path="/fill/:id" element={<FillForm />} />
        <Route path="/responses/:id" element={<ProtectedRoute><Responses /></ProtectedRoute>} />
        <Route path="/formSubmitted/:formName" element={<FormSubmitted />} />
        {/* Catch-All NotFound Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
        {/* Protected route for form preview with id parameter */}

        {/* Form fill route with id parameter */}

        {/* Form responses route with id parameter */}
