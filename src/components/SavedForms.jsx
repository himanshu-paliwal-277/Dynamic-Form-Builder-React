import { useEffect, useState } from "react";
import form_icon from "../assets/form-icon.png";
import { useNavigate } from "react-router-dom";
import store from "../state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import axiosInstance from "../helpers/axiosInstance";

function SavedForms() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const {deleteForm} = store();

  // Fetch the forms from the database
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axiosInstance.get("/api/forms");
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  
  const handleDelete = (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      deleteForm(formId);
      const newForms = forms.filter((form) => form._id !== formId);
      setForms(newForms);
    }
  };

  return (
    <>
      <div className="w-full bg-white px-[10%] pt-4 pb-20">
        <h1 className="mt-2 mb-8 text-2xl font-semibold">Saved Forms</h1>

        {forms.length === 0 ? (
          <p>No forms found. Create a new form!</p>
        ) : (
          <ul className="grid grid-cols-3 gap-x-12 gap-y-6">
            {forms.map((form) => (
              <li
                onClick={() => navigate(`/preview/${form._id}`)}
                key={form._id}
                className="group border-[1px] border-gray-300 cursor-pointer hover:border-purple-700 rounded-lg overflow-hidden shadow-md"
              >
                <div className="w-full px-12 pt-2 overflow-hidden bg-green-50 h-28">
                  <div className=" px-3 py-2  bg-white border-t-[6px] border-green-500 rounded-lg">
                    <h1 className="mb-1 overflow-hidden text-sm font-semibold">
                      {form.formName.length > 20 ? form.formName.slice(0, 20) + "..." : form.formName}
                    </h1>
                    <p className="overflow-hidden text-xs">{form.formDescription.length > 20 ? form.formDescription.slice(0, 20) + "..." : form.formDescription} </p>
                  </div>
                  <div className="w-full px-3 py-2 pt-1 mt-1 text-xs bg-white rounded-lg">
                    <h2>{form.fields[0].label}</h2>
                    <input
                      type={form.fields[0].type}
                      disabled
                      placeholder={form.fields[0].type}
                      className="pt-1 bg-transparent border-b-[1px] w-[90%] text-[10px]"
                      name=""
                      id=""
                    />
                  </div>
                </div>
                <div className="py-4 px-6 mt-1 bg-white border-t-[2px] flex justify-between items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-5 h-5 rounded-sm"
                      src={form_icon}
                      alt="form icon"
                    />
                     <h1 className="text-lg ">{form.formName.length > 20 ? form.formName.slice(0, 20) + "..." : form.formName}</h1>
                  </div>
                    <FontAwesomeIcon className="opacity-70 group-hover:opacity-100" onClick={(e) => {e.stopPropagation(); handleDelete(form._id)}} icon={faTrashCan} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default SavedForms;
