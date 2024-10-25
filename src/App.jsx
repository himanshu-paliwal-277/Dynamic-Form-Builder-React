import { Route, Routes } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormSubmission from "./pages/FormSubmission";
import ResponseViewer from "./pages/ResponseViewer";
import Home from "./pages/Home";
import FormPreview from "./components/formPreview";

function App() {
  return (
    <>
      {/* <h1>hello world</h1> */}
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formBuilder" element={<FormBuilder />} />
        <Route path="/preview/" element={<FormPreview />} />
        <Route path="/preview/:id" element={<FormPreview />} />
        <Route path="/submit" element={<FormSubmission />} />
        <Route path="/responses" element={<ResponseViewer />} />
      </Routes>
      {/* </Router> */}
    </>
  );
}

export default App;
