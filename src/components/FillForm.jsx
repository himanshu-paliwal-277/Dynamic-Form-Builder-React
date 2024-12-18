import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../helpers/axiosInstance';
import { SpinnerDotted } from 'spinners-react';

function FillForm() {
  const { id } = useParams(); // Get the form ID from the URL
  const [form, setForm] = useState(null);
  const [response, setResponse] = useState({}); // Store the user's responses
  const navigate = useNavigate();

  // Fetch the form data by ID
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axiosInstance.get(`/api/forms/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchForm();
  }, [id]);

  // Handle form field change
  const handleChange = (fieldId, value) => {
    setResponse((prev) => ({ ...prev, [fieldId]: value }));
  };

  // Submit the filled form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/api/forms/${id}/responses`, response);
      // alert('Form submitted successfully!');
      navigate('/formSubmitted/' + form.formName);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form');
    }
  };

  if (!form) return (
    <div>
      <div className="flex items-center justify-center w-full h-screen">
         <SpinnerDotted size={70} thickness={140} color="#3A99D8" />
      </div>
    </div>
  );

  return (
    <div className="sm:mx-[20%] mx-[5%] mb-20">
      <div className="px-6 py-8 mb-4 bg-white border-t-[12px] border-green-500 mt-4 rounded-xl">
        <h1 className='mb-2 text-2xl font-semibold sm:text-4xl'>{form.formName}</h1>
        <p>{form.formDescription}</p>
      </div>

      <form className="flex flex-col gap-4 text-sm sm:text-md" onSubmit={handleSubmit}>
        {form.fields.map((field, index) => (
          <div key={index} className="flex flex-col gap-3 py-8 overflow-hidden bg-white rounded-lg shadow-sm px-7">
            <label className="mb-2 font-semibold text-md sm:text-lg">{field.label}</label>
            {field.type === 'text' || field.type === 'number' || field.type === 'file' ? (
              <input
                className="w-full py-2 duration-100 border-b-2 outline-none focus:border-gray-500"
                type={field.type}
                onChange={(e) => handleChange(field.label, e.target.value)}
                required
              />
            ) : (
              <div>
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-2">
                    <input
                      type={field.type}
                      name={field.label}
                      className="mr-4" 
                      onChange={() => handleChange(field.label, option)}
                      // required
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div>
          <button className="px-6 font-semibold py-2 mt-4 text-white bg-[#298904] rounded hover:scale-105 active:scale-100 duration-200" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default FillForm;
