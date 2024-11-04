import Field from './Field';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import store from '../state/store';
// For generating unique IDs
import { v4 as uuidv4 } from 'uuid';  
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';


function FormBuilder() {
  const { fields, setFields } = store();
  const { formName, setFormName } = store();
  const { newFormSaved, setNewFormSaved } = store();
  const { formDescription, setFormDescription } = store();
  const navigate = useNavigate();
  const createForm = store((state) => state.createForm);

   // Function to save the form
   const handleSaveForm = async () => {
      await createForm(formName, formDescription, fields);
      setTimeout(() => {
        navigate('/');
        setFormName('');
        setFormDescription('');
        setFields([]);
        setNewFormSaved(!newFormSaved);
      }, 2000);
    }

  function handleAddField(type) {
    const newField = {
      id:  uuidv4(),  // Unique ID for the field
      type,          // Type of the field (text, number, etc.)
      label: '', 
      options: type === 'radio' || type === 'checkbox' ? [''] : [],  // Initialize options for radio/checkbox
    };
    setFields([...fields, newField]);
  };

  function handleDragEnd(result) {
    if (!result.destination) return;
    const updatedFields = Array.from(fields);
    const [movedField] = updatedFields.splice(result.source.index, 1);
    updatedFields.splice(result.destination.index, 0, movedField);
    setFields(updatedFields);
  };

  // Function to handle changing the label
  function handleLabelChange(id, newLabel) {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, label: newLabel } : field
    );
    setFields(updatedFields);
  };

  // Function to delete a field
  function handleDeleteField(id) {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  return (
    <>
      <Navbar />
      <button
        className="sm:hover:scale-110 sticky sm:active:scale-100 sm:top-28 top-[86px] left-0 sm:mt-6 sm:mx-[5%] mx-[3%] sm:scale-100 scale-75 bg-gray-50 rounded-full w-14 h-14 flex justify-center items-center z-10 sm:shadow-none shadow-lg"
        onClick={() => window.history.back()}
        type="button"
      >
        <FontAwesomeIcon className="text-2xl " icon={faArrowLeft} />
      </button>
      <div className="sm:mx-[10%] mx-[5%] sm:mt-8 mb-32 sm:text-base text-sm">
        <div className='px-6 py-8 mb-4 bg-white border-t-[12px] border-green-500 mt-4 rounded-xl'>
          {/* Form Name Input */}
          <div className="">
            <input
              className="w-full p-2 text-2xl font-semibold duration-200 outline-none sm:text-4xl focus:border-b-2 focus:border-green-500 focus:mb-5"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Enter form name"
            />
          </div>
          
          {/* Form Description Input */}
          <div className="">
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full p-2 border-b-[2px] border-gray-200 outline-none focus:mb-4 focus:border-b-2 focus:border-gray-500  duration-200"
              rows="1"
              style={{resize: "none"}}
              placeholder="Enter form description"
            />
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div className='flex flex-col gap-4' ref={provided.innerRef} {...provided.droppableProps}>
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Field field={field} handleLabelChange={handleLabelChange} handleDeleteField={handleDeleteField} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
         <div className='flex gap-4 mt-4 '>
            <button onClick={handleSaveForm} className="px-3 py-2 font-semibold text-white bg-green-500 rounded">
              Save Form
            </button>
            <button className='px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-opacity-80 active:bg-opacity-100' onClick={() => navigate('/preview')}>Preview</button>
          </div>
      </div>
      <div className='grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-between gap-2 sm:px-[5%] px-[2%] rounded-t-xl border-t-2 border-gray-300 sticky bottom-0 py-6 z-10 bg-white sm:mx-[5%] text-sm'>
          <button className='px-6 py-1 text-white bg-blue-500 rounded sm:rounded-lg sm:mx-3 sm:px-4 sm:py-2' onClick={() => handleAddField('text')}>Add Text Field</button>
          <button className='px-2 py-1 text-white bg-blue-500 rounded sm:rounded-lg sm:mx-3 sm:px-4 sm:py-2'  onClick={() => handleAddField('number')}>Add Number Field</button>
          <button className='px-2 py-1 text-white bg-blue-500 rounded sm:rounded-lg sm:mx-3 sm:px-4 sm:py-2' onClick={() => handleAddField('radio')}>Add Radio Buttons</button>
          <button className='px-6 py-1 text-white bg-blue-500 rounded sm:rounded-lg sm:mx-3 sm:px-4 sm:py-2'  onClick={() => handleAddField('checkbox')}>Add Checkbox</button>
          <button className='px-6 py-1 text-white bg-blue-500 rounded sm:rounded-lg sm:mx-3 sm:px-4 sm:py-2' onClick={() => handleAddField('file')}>Add File Upload</button>
      </div>
      <ToastContainer  position="bottom-right" autoClose={1500} />
    </>
  );
};

export default FormBuilder;
