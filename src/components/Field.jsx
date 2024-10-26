import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import dragAndDrop from '../assets/drag-and-drop.png';
import store from '../state/store';


function Field({ field, handleLabelChange, handleDeleteField }) {
  const { fields, setFields } = store();
  
  // Function to handle option change for radio/checkbox
  function handleOptionChange(fieldId, optionIndex, newOption) {
    const updatedFields = fields.map((field) => {
      if (field.id === fieldId) {
        const updatedOptions = [...field.options];
        updatedOptions[optionIndex] = newOption;
        return { ...field, options: updatedOptions };
      }
      return field;
    });
    setFields(updatedFields);
  };

  // Function to add a new option to a radio/checkbox field
  function handleAddOption(fieldId) {
    const updatedFields = fields.map((field) => {
      if (field.id === fieldId) {
        return { ...field, options: [...field.options, ''] };  // Add empty option
      }
      return field;
    });
    setFields(updatedFields);
  };

  // Function to delete an option from a radio/checkbox field
  function handleDeleteOption(fieldId, optionIndex) {
    const updatedFields = fields.map((field) => {
      if (field.id === fieldId) {
        const updatedOptions = field.options.filter((_, index) => index !== optionIndex);
        return { ...field, options: updatedOptions };
      }
      return field;
    });
    setFields(updatedFields);
  };
  
  return (
    <div className="relative flex flex-col gap-3 py-10 overflow-hidden bg-white rounded-lg shadow-sm px-7 group">
      <div className='absolute top-0 flex justify-center pt-2' style={{ width: 'calc(100% - 34px)'}}>
        <img className='w-5 h-5 duration-200 rotate-90 opacity-0 group-hover:opacity-30' src={dragAndDrop} alt="drag and drop image" />
      </div>
      {/* Input for setting the label */}
      <input
        type="text"
        placeholder="Enter label"
        value={field.label}
        onChange={(e) => handleLabelChange(field.id, e.target.value)}
        className="w-full p-2 mb-2 text-xl duration-200 outline-none focus:bg-gray-50 focus:px-4 focus:py-6 focus:border-b-2 focus:border-gray-500"
      />

      {/* Render the field based on selected type */}
      {field.type === "text" && (
        <input
          type="text"
          disabled
          className="w-full p-2 bg-transparent border-b-2 border-gray-200"
          placeholder="Text input"
        />
      )}
      {field.type === "number" && (
        <input
          type="number"
          disabled
          className="w-full p-2 bg-transparent border-b-2 border-gray-200"
          placeholder="Number input"
        />
      )}
      {/* Render options for radio buttons */}
      {field.type === 'radio' && (
        <div>
          {field.options?.map((option, index) => (
            <div key={index} className="mb-2">
              <input type="radio" disabled className="mr-2" />
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(field.id, index, e.target.value)}
                className="w-[90%] duration-75 p-2 outline-none  focus:border-b-2 focus:border-gray-500"
                placeholder={`Option ${index + 1}`}
              />
              {/* Delete Option */}
              <button onClick={() => handleDeleteOption(field.id, index)} className="ml-2 text-red-500">
                <FontAwesomeIcon icon={faXmark} className='text-lg text-black opacity-50 hover:opacity-80' />
              </button>
            </div>
          ))}
          {/* Add Option */}
          <button onClick={() => handleAddOption(field.id)} className="text-blue-500">
            + Add Option
          </button>
        </div>
      )}

      {/* Render options for checkboxes */}
      {field.type === 'checkbox' && (
        <div>
          {field.options?.map((option, index) => (
            <div key={index} className="mb-2">
              <input type="checkbox" disabled className="mr-2" />
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(field.id, index, e.target.value)}
                className="w-[90%] duration-75 p-2 outline-none  focus:border-b-2 focus:border-gray-500"
                placeholder={`Option ${index + 1}`}
              />
              {/* Delete Option */}
              <button onClick={() => handleDeleteOption(field.id, index)} className="ml-2 text-red-500">
                <FontAwesomeIcon icon={faXmark} className='text-lg text-black opacity-50 hover:opacity-80' />
              </button>
            </div>
          ))}
          {/* Add Option */}
          <button onClick={() => handleAddOption(field.id)} className="text-blue-500">
            + Add Option
          </button>
        </div>
      )}
       
      {field.type === "file" && (
        <div>
          <input type="file" disabled className="w-full p-2 border" />
        </div>
      )}
      {/* Delete button to remove the field */}
      <button
        className="absolute duration-200 opacity-0 group-hover:opacity-60 hover:opacity-100 right-6 top-4 hover:scale-110 active:scale-100"
        onClick={() => handleDeleteField(field.id)}
      >
        {/* &#x2716; X mark icon */}
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      
    </div>
  );
};

export default Field;
