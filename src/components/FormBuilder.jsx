import Field from './Field';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import store from '../state/store';
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs
import axios from 'axios';

function FormBuilder() {
  const { fields, setFields } = store();
  const { formName, setFormName } = store();
  const { formDescription, setFormDescription } = store();
  const navigate = useNavigate();

   // Function to save the form
   const handleSaveForm = async () => {
    const formData = {
      formName: formName,
      formDescription: formDescription,
      fields: fields,
    };
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:5000/api/forms', formData);
      alert('Form saved successfully!');
      console.log(response.data);
      navigate('/');
      setFormName('Untitled form');
      setFormDescription('');
      setFields([]);
    }
    catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save the form');
    }
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
      <div className="mx-[10%]">
        <h1>Create your form</h1>
        <div className='px-6 py-8 mb-4 bg-white border-t-[12px] border-green-500 mt-4 rounded-xl'>
          {/* Form Name Input */}
          <div className="">
            <input
              className="w-full p-2 text-4xl font-semibold duration-200 outline-none focus:border-b-2 focus:border-green-500 focus:mb-5"
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
          
        <div className='flex gap-3'>
          <button className='px-3 py-1 bg-gray-300' onClick={() => navigate('/preview')}>Preview</button>
          <button className='px-3 py-1 bg-gray-300' onClick={() => navigate('/responses')}>Responses</button>
          <button className='px-3 py-1 bg-gray-300' onClick={() => navigate('/submit')}>Submit</button>
          <button onClick={() => console.log(fields)}>see</button>
        </div>
        
        {/* Save Form Button */}
        <button
          onClick={handleSaveForm}
          className="p-2 mt-4 text-white bg-green-500 rounded"
        >
          Save Form
        </button>
      </div>
      <div className='flex flex-wrap justify-between px-[5%] rounded-t-xl border-2 border-b-gray-300 sticky bottom-0 py-6 z-10 bg-white mx-[5%]'>
          <button className='px-4 py-2 mx-3 text-white bg-blue-500 rounded-lg' onClick={() => handleAddField('text')}>Add Text Field</button>
          <button className='px-4 py-2 mx-3 text-white bg-blue-500 rounded-lg' onClick={() => handleAddField('number')}>Add Number Field</button>
          <button className='px-4 py-2 mx-3 text-white bg-blue-500 rounded-lg' onClick={() => handleAddField('radio')}>Add Radio Buttons</button>
          <button className='px-4 py-2 mx-3 text-white bg-blue-500 rounded-lg' onClick={() => handleAddField('checkbox')}>Add Checkbox</button>
          <button className='px-4 py-2 mx-3 text-white bg-blue-500 rounded-lg' onClick={() => handleAddField('file')}>Add File Upload</button>
      </div>
    </>
  );
};

export default FormBuilder;
