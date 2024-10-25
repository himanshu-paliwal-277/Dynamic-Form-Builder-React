import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import form_icon from '../assets/form-icon.png'
import logo from '../assets/logo.png'
import store from '../state/store';

function HomePage() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const { setFormName, setFormDescription, setFields } = store();

  // Fetch the forms from the database
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  function createForm() {
    setFormName('Untitled form');
    setFormDescription('');
    setFields([])
    navigate('/formBuilder');
  }

  function createContactInfoForm() {
    setFormName('Contact Information');
    setFormDescription('');
    setFields([
      {
        label: 'Name',
        type: 'text',
        options: []
      },
      {
        label: 'Email',
        type: 'text',
        options: []
      },
      {
        label: "address",
        type: 'text',
        options: []
      },
      {
        label: 'Phone',
        type: 'number',
        options: []
      }
    ])
    navigate('/formBuilder');
  }

  return (
    <>
        <nav className='flex items-center justify-between w-full h-20 bg-white px-[5%] sticky top-0'>
            <div className='flex items-center gap-4'>
                <img className='w-8 ' src={logo} alt="website logo" />
                <h1 className='text-2xl font-semibold '>Dynamic Form Builder</h1>
            </div>
            <div>
                <div className='w-10 h-10 bg-gray-300 rounded-full'>

                </div>
            </div>
        </nav>
        {/* <h1>Home Page</h1> */}
        <div className='px-[10%] pt-5 pb-8 flex flex-col gap-5 bg-gray-100 bg-opacity-50'>
          <h1 className='text-2xl'>Create New Form</h1>
          <div className='flex gap-5'>
            <div className=''>
              <div onClick={() => createForm()} className='border-[1px] border-gray-300 hover:border-purple-600  cursor-pointer flex items-center justify-center h-40 mb-2 text-5xl bg-white rounded-lg w-56'>
              +
              </div>
              <h3 className='text-lg'>New Form</h3>
            </div>
            <div className=''>
              <div onClick={() => createContactInfoForm()} className='border-[1px] border-gray-300 hover:border-purple-600  cursor-pointer flex items-center justify-center h-40 mb-2 text-5xl  rounded-lg w-56 bg-green-100'>
                {/* -------------------- */}
                <div className='w-full overflow-hidden px-7 h-28'>
                      <div className=' px-3 py-2  bg-white border-t-[6px] border-green-500 rounded-lg'>
                          <h1 className='mb-1 text-sm font-semibold'>Contact Information</h1>
                          <p className='text-xs'></p>
                      </div>
                      <div className='w-full px-3 py-2 pt-1 mt-1 text-xs bg-white rounded-lg'>
                          <h2 className='text-[10px]'>Name</h2>
                          <input type="text" disabled placeholder="text" className='pt-1 bg-transparent border-b-[1px] w-[90%] text-[10px]' />
                      </div>
                      <div className='w-full px-3 py-2 pt-1 mt-1 text-xs bg-white rounded-lg'>
                          <h2 className='text-[10px]'>Email</h2>
                          <input type="text" disabled placeholder="text" className='pt-1 bg-transparent border-b-[1px] w-[90%] text-[10px]' />
                      </div>
                  </div>
              {/* -------------------- */}
              </div>
              <h3 className='text-lg'>Contact Information</h3>
            </div>
          </div>
        </div>
        <div className='flex gap-3'>
          <h1>Pages:</h1>
            <button className='px-3 py-1 bg-gray-300' onClick={() => navigate('/FormBuilder')}>FormBuilder</button>
            <button className='px-3 py-1 bg-gray-300' onClick={() => navigate('/preview')}>Preview</button>
            <button className='px-3 py-1 bg-gray-300' onClick={() => navigate('/responses')}>Responses</button>
            <button className='px-3 py-1 bg-gray-300' onClick={() => navigate('/submit')}>Submit</button>
        </div>
        <div className="w-full bg-white px-[10%] py-4">
          <h1 className="mt-2 mb-8 text-2xl font-semibold">Saved Forms</h1>
    
          {forms.length === 0 ? (
            <p>No forms found. Create a new form!</p>
          ) : (
            <ul className='grid grid-cols-3 gap-x-12 gap-y-6'>
              {forms.map((form) => (
                <li onClick={() => navigate(`/preview/${form._id}`)} key={form._id} className=" border-[1px] border-gray-300 cursor-pointer hover:border-purple-700 rounded-lg overflow-hidden"> 
                <div className='w-full px-12 pt-2 overflow-hidden bg-green-50 h-28'>
                    <div className=' px-3 py-2  bg-white border-t-[6px] border-green-500 rounded-lg'>
                        <h1 className='mb-1 text-sm font-semibold'>{form.formName}</h1>
                        <p className='text-xs'>{form.formDescription} </p>
                    </div>
                    <div className='w-full px-3 py-2 pt-1 mt-1 text-xs bg-white rounded-lg'>
                        <h2>{form.fields[0].label}</h2>
                        <input type={form.fields[0].type} disabled placeholder={form.fields[0].type} className='pt-1 bg-transparent border-b-[1px] w-[90%] text-[10px]' name="" id="" />
                    </div>
                </div>
                  <div className='py-4 px-6 mt-1 bg-white border-t-[2px] flex items-center gap-3' >
                    <img className='w-5 h-5 rounded-sm'  src={form_icon} alt="form icon" />
                    <h1 className='text-lg'>{form.formName}</h1>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
    </>
  );
};

export default HomePage;
