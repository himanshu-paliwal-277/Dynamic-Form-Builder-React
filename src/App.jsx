import { Route, Routes } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormPreview from "./components/formPreview";
import FormSubmission from "./pages/FormSubmission";
import ResponseViewer from "./pages/ResponseViewer";

function App() {
  return (
    <>
    {/* <h1>hello world</h1> */}
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/preview" element={<FormPreview />} />
        <Route path="/submit" element={<FormSubmission />} />
        <Route path="/responses" element={<ResponseViewer />} />
      </Routes>
    </>
  );
}

export default App;
