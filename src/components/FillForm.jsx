import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FillForm() {
  const { id } = useParams(); // Get the form ID from the URL
  const [form, setForm] = useState(null);
  const [response, setResponse] = useState({}); // Store the user's responses

  // Fetch the form data by ID
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
        setForm(response.data);
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
      await axios.post(`http://localhost:5000/api/forms/${id}/responses`, response);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="mx-[20%] mb-20">
      <div className="px-6 py-8 mb-4 bg-white border-t-[12px] border-green-500 mt-4 rounded-xl">
        <h1 className='mb-2 text-4xl font-semibold'>{form.formName}</h1>
        <p>{form.formDescription}</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {form.fields.map((field, index) => (
          <div key={index} className="flex flex-col gap-3 py-8 overflow-hidden bg-white rounded-lg shadow-sm px-7">
            <label className="mb-2 text-lg">{field.label}</label>
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
                      required
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button className="px-6 font-semibold py-2 mt-4 text-white bg-[#298904] rounded hover:scale-105 active:scale-100 duration-200" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FillForm;
