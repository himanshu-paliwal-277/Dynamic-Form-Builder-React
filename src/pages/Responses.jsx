import { useEffect } from "react";
import { useParams } from "react-router-dom";
import store from "../state/store";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function Responses() {
  const { id } = useParams(); // Form ID
  // const [responses, setResponses] = useState([]);
  const fetchResponses = store((state) => state.fetchResponses);
  const responses = store((state) => state.responses);

  // Fetch responses for the form
  useEffect(() => {
    fetchResponses(id);
  }, [id, fetchResponses]);

  return (
    <>
    <Navbar />
    <button className="absolute left-0 mt-6 mx-[5%] text=lg font-semibold hover:scale-110 active:scale-100" onClick={() => window.history.back()} type="button">
    <FontAwesomeIcon className="text-2xl" icon={faArrowLeft} />
    </button>
    <div className="mx-[10%] mt-8 flex flex-col">
      <h1 className="px-3 py-4 text-xl font-semibold bg-white rounded-lg">
        Responses
      </h1>
      <div className="mt-3 overflow-hidden bg-white rounded-lg" >
        {responses && responses.length > 0 ? (
          <table className="flex flex-col ">
            <thead className="text-white bg-green-500">
              <tr className="flex justify-between py-3 pl-8 ">
                <th className="w-[20%] text-start">S no.</th>
                {responses[0]?.answers &&
                  Object.keys(responses[0].answers).map((field, i) => (
                    <th className="w-[20%] text-start" key={i}>{field}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr className={`flex justify-between pl-8 py-3 ${index % 2 === 0 ? " bg-transperent" : " bg-gray-100" }`} key={index}>
                  <td className="w-[20%] font-semibold">{index+1 + "."}</td>
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
