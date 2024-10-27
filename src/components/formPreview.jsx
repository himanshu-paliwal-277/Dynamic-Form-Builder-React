import { useQuery } from "react-query";
import store from "../state/store";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../helpers/axiosInstance";
import { SpinnerDotted } from "spinners-react";

function FormPreview() {
  const { id } = useParams(); // Get the form ID from the URL if available
  const navigate = useNavigate();

  // Data from the store (used if no ID is provided in URL)
  const { fields, formName, formDescription } = store();

  // Use React Query to fetch form data
  const {
    data: formData,
    isLoading,
    error,
    isSuccess,
  } = useQuery(
    ["form", id],
    async () => {
      if (id) {
        // Only fetch if there's an ID in the URL
        const response = await axiosInstance.get(`/api/forms/${id}`);
        return response.data; // Return fetched form data
      }
    },
    {
      enabled: !!id, // Only run the query if ID is available
    }
  );

  // Determine whether to use store data or fetched data
  const currentFormName = formData ? formData.formName : formName;
  const currentFormDescription = formData
    ? formData.formDescription
    : formDescription;
  const currentFields = formData ? formData.fields : fields;

  function handleCopy() {
    const link = `https://dynamic-form-builder-react-js.netlify.app/fill/${id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Error copying link:", error));
  }

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="flex items-center justify-center w-full h-screen">
          <SpinnerDotted size={80} thickness={160} color="#3A99D8" />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      <button
        className="hover:scale-110 sticky active:scale-100 top-28 left-0 mt-6 mx-[5%] text=lg font-semibold"
        onClick={() => window.history.back()}
        type="button"
      >
        <FontAwesomeIcon className="text-2xl " icon={faArrowLeft} />
      </button>
      {isSuccess && (
        <div>
          <div className="mx-[20%] mt-8 mb-20">
            {/* Form Name and Description */}
            <div className="px-6 py-8 mb-4 bg-white border-t-[12px] border-green-500 mt-4 rounded-xl">
              <h1 className="mb-2 text-4xl font-semibold">
                {currentFormName || "Untitled Form"}
              </h1>
              <p>{currentFormDescription}</p>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4 ">
              {currentFields?.map((field, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 py-8 overflow-hidden bg-white rounded-lg shadow-sm px-7"
                >
                  <label className="mb-2 text-lg">{field.label}</label>

                  {/* Render different input types based on field type */}
                  {field.type === "number" ||
                  field.type === "text" ||
                  field.type === "file" ? (
                    <input
                      type={field.type}
                      className="w-full py-2 duration-100 border-b-2 outline-none focus:border-gray-500"
                      placeholder={`Input ${field.type}`}
                    />
                  ) : (
                    // Render options for radio and checkbox fields
                    <div>
                      {field.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mr-2">
                          <input type={field.type} className="mr-4" />
                          <label>{option || `Option ${optionIndex + 1}`}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {id && (
            <div className="sticky bottom-0 flex justify-between px-8 py-4 bg-white border-t-2 ">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Link:</h1>
                <input
                  className="px-1 py-1 border-b-2 outline-none w-52 "
                  type="text"
                  value={`https://dynamic-form-builder-react-js.netlify.app/fill/${id}`}
                />
                <button
                  className="px-4 py-2 ml-4 font-bold text-gray-500 border-[2px] rounded hover:bg-gray-100 active:bg-gray-200 "
                  onClick={handleCopy}
                >
                  Copy
                </button>
              </div>
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => navigate(`/responses/${id}`)}
              >
                Responses
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FormPreview;
