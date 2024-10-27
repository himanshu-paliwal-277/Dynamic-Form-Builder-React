import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query'; // Import useQuery
import axiosInstance from '../helpers/axiosInstance'; // Import your axios instance
import { SpinnerDotted } from "spinners-react";

function Responses() {
  const { id } = useParams(); // Form ID
  
  // Fetch responses for the form using React Query
  const { data: responses = [], isLoading, isError } = useQuery(
    ['responses', id], // Unique query key
    () => axiosInstance.get(`/api/forms/${id}/responses`).then(res => res.data), // Fetch data
    {
      enabled: !!id, // Only run the query if id exists
    }
  );

  return (
    <>
      <Navbar />
      <button
        className="sm:hover:scale-110 sticky sm:active:scale-100 sm:top-28 top-[86px] left-0 sm:mt-6 sm:mx-[5%] mx-[3%] sm:scale-100 scale-75 bg-gray-50 rounded-full w-14 h-14 flex justify-center items-center mb-3"
        onClick={() => window.history.back()}
        type="button"
      >
        <FontAwesomeIcon className="text-2xl " icon={faArrowLeft} />
      </button>
      <div className="sm:mx-[10%] mx-[5%] mb-12 sm:mt-8 flex flex-col">
        <h1 className="px-3 py-4 font-semibold bg-white rounded-lg sm:text-xl">
          Responses
        </h1>
        <div className={`mt-3 sm:text-md text-sm overflow-hidden ${isLoading ? "" : "bg-white"} rounded-lg`}>
          {isLoading ? (
            <div className="flex justify-center w-full h-40">
              <SpinnerDotted size={70} thickness={140} color="#3A99D8" />
            </div>
          ) : isError ? (
            <p className="p-3">Error fetching responses.</p> // Error state
          ) : responses.length > 0 ? (
            <table className="flex flex-col w-[100%]  overflow-x-auto">
              <thead className="text-white bg-green-500">
                <tr className="flex justify-between py-3 pl-3 sm:pl-8 ">
                  <th className="sm:w-[20%] w-[14%] text-start">S no.</th>
                  {responses[0]?.answers &&
                    Object.keys(responses[0].answers).map((field, i) => (
                      <th className="w-[20%] text-start" key={i}>{field}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr className={`flex justify-between sm:pl-8 pl-3 py-3 ${index % 2 === 0 ? "bg-transparent" : "bg-gray-100"}`} key={index}>
                    <td className="sm:w-[20%] w-[14%] font-semibold">{index + 1 + "."}</td>
                    {response.answers &&
                      Object.values(response.answers).map((answer, i) => (
                        <td className="w-[20%] h-10 overflow-auto " key={i}>{answer}</td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-3">No responses available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Responses;
