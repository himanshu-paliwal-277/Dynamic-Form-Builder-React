import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import form_icon from '../assets/form-icon.png'
import store from '../state/store';
import Navbar from '../components/navbar';

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
        id: "ce99b85a-6af7-4f75-96e6-19e7f06e2771",
        label: 'Name',
        type: 'text',
        options: []
      },
      {
        id: "ce99b85a-6af7-4f75-96e6-19e7f06e2772",
        label: 'Email',
        type: 'text',
        options: []
      },
      {
        id: "ce99b85a-6af7-4f75-96e6-19e7f06e2773",
        label: "address",
        type: 'text',
        options: []
      },
      {
        id: "ce99b85a-6af7-4f75-96e6-19e7f06e2774",
        label: 'Phone',
        type: 'number',
        options: []
      }
    ])
    navigate('/formBuilder');
  }

  return (
    <>
        <Navbar />
        {/* <h1>Home Page</h1> */}
        <div className='px-[10%] pt-5 pb-8 flex flex-col gap-5 bg-gray-100 bg-opacity-50'>
          <h1 className='text-2xl'>Create New Form</h1>
          <div className='flex gap-5'>
            <div className=''>
              <div onClick={() => createForm()} className='border-[1px] border-gray-300 hover:border-purple-600  cursor-pointer flex items-center justify-center h-40 mb-2 text-5xl bg-white rounded-lg w-56 overflow-hidden'>
                <img className='w-[80%]' src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png" alt="plus icon" />
              </div>
              <h3 className='text-lg'>New Form</h3>
            </div>
            <div className=''>
              <div onClick={() => createContactInfoForm()} className='overflow-hidden border-[1px] border-gray-300 hover:border-purple-600  cursor-pointer flex items-center justify-center h-40 mb-2 text-5xl  rounded-lg w-56 bg-green-100'>
                <div className='w-full h-40 pt-4 overflow-hidden px-7'>
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
              </div>
              <h3 className='text-lg'>Contact Information</h3>
            </div>
          </div>
        </div>
        <div className="w-full bg-white px-[10%] pt-4 pb-20">
          <h1 className="mt-2 mb-8 text-2xl font-semibold">Saved Forms</h1>
    
          {forms.length === 0 ? (
            <p>No forms found. Create a new form!</p>
          ) : (
            <ul className='grid grid-cols-3 gap-x-12 gap-y-6'>
              {forms.map((form) => (
                <li onClick={() => navigate(`/preview/${form._id}`)} key={form._id} className=" border-[1px] border-gray-300 cursor-pointer hover:border-purple-700 rounded-lg overflow-hidden shadow-md"> 
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
