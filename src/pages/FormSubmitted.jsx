import { useNavigate } from "react-router-dom";
import store from "../state/store";

function FormSubmitted() {
    const {formName} = store();
    const navigate = useNavigate();
    return (
        <>
            <div className="mx-[20%] mt-12">
                <div className="w-full bg-white border-t-[10px] border-green-500 rounded-lg p-7 shadow-md">
                    <h1 className="mb-4 text-3xl font-semibold">{formName}</h1>
                    <p>Your form has been submitted successfully!</p>
                    <button className="mt-6 font-semibold underline text-sky-600" onClick={() => navigate("/")}>Back to home</button>
                </div>
            </div>
        </>
    );
}

export default FormSubmitted;