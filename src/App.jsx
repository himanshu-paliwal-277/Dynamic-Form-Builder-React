import { Route, Routes } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import Home from "./pages/Home";
import FormPreview from "./components/formPreview";
import FillForm from "./components/FillForm";
import Responses from "./pages/Responses";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formBuilder" element={<FormBuilder />} />
        <Route path="/preview/" element={<FormPreview />} />
        <Route path="/preview/:id" element={<FormPreview />} />
        <Route path="/fill/:id" element={<FillForm />} />
        <Route path="/responses/:id" element={<Responses />} />
      </Routes>
    </>
  );
}

export default App;
