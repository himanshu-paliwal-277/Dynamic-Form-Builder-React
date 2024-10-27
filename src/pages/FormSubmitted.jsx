import { useNavigate, useParams } from "react-router-dom";

function FormSubmitted() {
    const navigate = useNavigate();
    const {formName} = useParams();
    return (
        <>
            <div className="sm:mx-[20%] mx-[5%] mt-6">
                <div className="w-full bg-white border-t-[10px] border-green-500 rounded-lg p-7 shadow-md">
                    <h1 className="mb-4 text-2xl font-semibold sm:text-3xl">{formName}</h1>
                    <p className="text-sm sm:text-base">Your form has been submitted successfully!</p>
                    <button className="mt-6 text-sm font-semibold underline text-sky-600 sm:text-base" onClick={() => navigate("/")}>Back to home</button>
                </div>
            </div>
        </>
    );
}

export default FormSubmitted;