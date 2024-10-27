import { useNavigate } from 'react-router-dom';
import store from '../state/store';
import Navbar from '../components/Navbar';
import { ContactInformationForm } from '../components/PreBuildForms/ContactInformationForm';
import SavedForms from '../components/SavedForms';
import Footer from '../components/Footer';

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
        <div className='sm:px-[10%] px-[5%] pt-5 pb-8 flex flex-col gap-5 bg-gray-100 bg-opacity-50'>
          <h1 className='text-lg sm:text-2xl'>Create New Form</h1>
          <div className='flex gap-5'>
            <div className=''>
              <div onClick={() => createForm()} className='border-[1px] border-gray-300 hover:border-purple-600  cursor-pointer flex items-center justify-center sm:h-40 h-24 mb-2 text-5xl bg-white rounded-lg w-28 sm:w-56 overflow-hidden'>
                <img className='w-[80%]' src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png" alt="plus icon" />
              </div>
              <h3 className='text-md sm:text-lg'>New Form</h3>
            </div>
            <div className=''>
              <div onClick={() => createContactInfoForm()} className='overflow-hidden border-[1px] border-gray-300 hover:border-purple-600  cursor-pointer flex items-center justify-center sm:h-40 h-24 mb-2 text-5xl  rounded-lg sm:w-56 w-28 bg-green-100'>
                <div className='w-full px-2 pt-4 overflow-hidden h-28 sm:h-40 sm:px-7'>
                      <div className='sm:px-3 px-2 py-2  bg-white border-t-[6px] border-green-500 rounded-lg'>
                          <h1 className='mb-1 text-xs font-semibold sm:text-sm'>Contact Information</h1>
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
              <h3 className='text-md sm:text-lg'>Contact Information</h3>
            </div>
          </div>
        </div>
        <SavedForms />
        <Footer />
    </>
  );
};

export default HomePage;
