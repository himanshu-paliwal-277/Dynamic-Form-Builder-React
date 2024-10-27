import { useNavigate } from 'react-router-dom';
import store from '../state/store';
import Navbar from '../components/navbar';
import { ContactInformationForm } from '../components/PreBuildForms/ContactInformationForm';
import SavedForms from '../components/SavedForms';

function HomePage() {
  const navigate = useNavigate();
  const { setFormName, setFormDescription, setFields } = store();

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
      ...ContactInformationForm
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
        {/* Saved Forms */}
        <SavedForms />
        <footer className='py-6 text-center text-white bg-black'>
          <p>&copy; {new Date().getFullYear()} all rights reserved by <a href="https://github.com/himanshu-paliwal-277" target="_blank" className='text-blue-300 hover:underline'>Himanshu Paliwal</a>.</p>
        </footer>
    </>
  );
};

export default HomePage;
