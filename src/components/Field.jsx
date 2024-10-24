import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import dragAndDrop from '../assets/drag-and-drop.png';


function Field({ field, handleLabelChange, handleDeleteField }) {
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
      {field.type === "radio" && (
        <div>
          <input type="radio" disabled className="mr-2" /> Option
        </div>
      )}
      {field.type === "checkbox" && (
        <div>
          <input type="checkbox" disabled className="mr-2" /> Option
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
