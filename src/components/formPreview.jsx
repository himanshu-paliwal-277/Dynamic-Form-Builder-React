import { useEffect, useState } from 'react';
import axios from 'axios';
import store from "../state/store";
import { useParams } from 'react-router-dom';
import Navbar from './navbar';

function FormPreview() {
  const { id } = useParams(); // Get the form ID from the URL if available
  // Local state to store form data when fetched from the backend
  const [formData, setFormData] = useState(null);

  // Data from the store (used if no ID is provided in URL)
  const { fields, formName, formDescription } = store();

  // Fetch form data by ID if an ID is present in the URL
  useEffect(() => {
    console.log("Form ID:", id);
    const fetchForm = async () => {
      if (id) { // Only fetch if there's an ID in the URL
        try {
          const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
          setFormData(response.data); // Set fetched form data
        } catch (error) {
          console.error('Error fetching form:', error);
        }
      }
    };

    fetchForm();
  }, [id]);

  // Determine whether to use store data or fetched data
  const currentFormName = formData ? formData.formName : formName;
  const currentFormDescription = formData ? formData.formDescription : formDescription;
  const currentFields = formData ? formData.fields : fields;

  return (
    <>
    <Navbar />
    <div className="mx-[20%] mt-8 mb-20">
      {/* <h1 className="mb-3 text-3xl font-bold">Form Preview</h1> */}
      
      {/* Form Name and Description */}
      <div className="px-6 py-8 mb-4 bg-white border-t-[12px] border-green-500 mt-4 rounded-xl">
        <h1 className="mb-2 text-4xl font-semibold">{currentFormName || "Untitled Form"}</h1>
        <p>{currentFormDescription}</p>
      </div>
      
      {/* Form Fields */}
      <div className="flex flex-col gap-4 form-preview">
        {currentFields?.map((field, index) => (
          <div key={index} className="flex flex-col gap-3 py-8 overflow-hidden bg-white rounded-lg shadow-sm px-7">
            <label className="mb-2 text-lg">{field.label}</label>

            {/* Render different input types based on field type */}
            {field.type === "number" || field.type === "text" || field.type === "file" ? (
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
    </>
  );
}

export default FormPreview;
