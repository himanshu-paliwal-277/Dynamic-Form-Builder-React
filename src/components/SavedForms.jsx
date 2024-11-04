import form_icon from "../assets/form-icon.png";
import { useNavigate } from "react-router-dom";
import store from "../state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axiosInstance from "../helpers/axiosInstance";
import { useQuery, useQueryClient } from "react-query";
import { SpinnerDotted } from "spinners-react";
import { ToastContainer } from "react-toastify";

function SavedForms() {
  const { user, newFormSaved } = store();
  const navigate = useNavigate();
  const { deleteForm } = store();
  
  // Use QueryClient to invalidate queries later
  const queryClient = useQueryClient();
  
  async function fetchForms() {
    const response = await axiosInstance.get("/api/forms");
    return response.data;
  }

  // Use the query to fetch forms
  const { data: forms = [], isLoading, error } = useQuery(
    ["fetchForms", user, newFormSaved], // Keep the user in the key for cache validity
    fetchForms,
    {
      enabled: !!user, // Only fetch if user is defined
      cacheTime: 1000 * 60 * 2, // Cache duration
      staleTime: 1000 * 60 * 2, // Fresh duration
      onError: (error) => {
        console.error("Error fetching forms:", error);
      },
    }
  );

  // Handle loading and error states
  if (isLoading) {
    return (
    <div className="flex items-center justify-center w-full h-44">
      <SpinnerDotted size={70} thickness={140} color="#3A99D8" />
    </div>);
  }

  if (error) {
    return <p>Error fetching data.</p>;
  }

  // Handle the delete action
  const handleDelete = async (formId) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await deleteForm(formId); // Ensure deleteForm performs an API call to delete
        queryClient.invalidateQueries(["fetchForms", user]); // Invalidate the query to refetch data
      } catch (error) {
        console.error("Error deleting form:", error);
      }
    }
  };

  return (
    <div className="w-full bg-white sm:px-[10%] px-[6%] pt-4 pb-20">
      <h1 className="mt-2 mb-8 text-xl font-semibold sm:text-2xl">Saved Forms</h1>

      {forms.length === 0 ? (
        <p>No forms found. Create a new form!</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-6">
          {forms.map((form) => (
            <li
              onClick={() => navigate(`/preview/${form._id}`)}
              key={form._id}
              className="group border-[1px] border-gray-300 cursor-pointer hover:border-purple-700 rounded-lg overflow-hidden shadow-md"
            >
              <div className="w-full px-12 pt-2 overflow-hidden bg-green-50 h-28">
                <div className="px-3 py-2 bg-white border-t-[6px] border-green-500 rounded-lg">
                  <h1 className="mb-1 overflow-hidden text-sm font-semibold">
                    {form.formName.length > 20
                      ? form?.formName.slice(0, 20) + "..."
                      : form?.formName}
                  </h1>
                  <p className="overflow-hidden text-xs">
                    {form.formDescription.length > 20
                      ? form?.formDescription.slice(0, 20) + "..."
                      : form?.formDescription}{" "}
                  </p>
                </div>
                <div className="w-full px-3 py-2 pt-1 mt-1 text-xs bg-white rounded-lg">
                  <h2>{form?.fields[0].label}</h2>
                  <input
                    type={form?.fields[0].type}
                    disabled
                    placeholder={form.fields[0].type}
                    className="pt-1 bg-transparent border-b-[1px] w-[90%] text-[10px]"
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
                  <h1 className="text-lg ">
                    {form.formName.length > 20
                      ? form?.formName.slice(0, 20) + "..."
                      : form?.formName}
                  </h1>
                </div>
                <FontAwesomeIcon
                  className="opacity-70 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(form._id);
                  }}
                  icon={faTrashCan}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer  position="bottom-right" autoClose={1500} />
    </div>
  );
}

export default SavedForms;
