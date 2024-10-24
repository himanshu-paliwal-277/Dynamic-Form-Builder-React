import Field from './Field';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import store from '../state/store';

function FormBuilder() {
  const { fields, setFields } = store();
  const navigate = useNavigate();

  function handleAddField(type) {
    setFields([...fields, { id: `field-${fields.length}`, type, label: '' }]);
  };

  function handleDragEnd(result) {
    if (!result.destination) return;
    const updatedFields = Array.from(fields);
    const [movedField] = updatedFields.splice(result.source.index, 1);
    updatedFields.splice(result.destination.index, 0, movedField);
    setFields(updatedFields);
  };

  return (
    <div className="form-builder">
      <h1>Create your form</h1>
      <button className='bg-blue-500 text-white px-4 py-2 mx-3 rounded-lg' onClick={() => handleAddField('text')}>Add Text Field</button>
      <button className='bg-blue-500 text-white px-4 py-2 mx-3 rounded-lg' onClick={() => handleAddField('number')}>Add Number Field</button>
      <button className='bg-blue-500 text-white px-4 py-2 mx-3 rounded-lg' onClick={() => handleAddField('radio')}>Add Radio Buttons</button>
      <button className='bg-blue-500 text-white px-4 py-2 mx-3 rounded-lg' onClick={() => handleAddField('checkbox')}>Add Checkbox</button>
      <button className='bg-blue-500 text-white px-4 py-2 mx-3 rounded-lg' onClick={() => handleAddField('file')}>Add File Upload</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Field field={field} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button className='bg-gray-300 px-3 py-1' onClick={() => navigate('/preview')}>Preview</button>
      <button className='bg-gray-300 px-3 py-1' onClick={() => navigate('/responses')}>Responses</button>
      <button className='bg-gray-300 px-3 py-1' onClick={() => navigate('/submit')}>Submit</button>
      <button onClick={() => console.log(fields)}>see</button>
    </div>
  );
};

export default FormBuilder;
