import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  FIELD: 'field',
};

// Field component for the input options on the left side
const Field = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FIELD,
    item: { type, label, isNew: true },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 bg-white border rounded shadow-md cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {label}
    </div>
  );
};

const DroppedField = ({ field, index, moveField, onRemove }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FIELD,
    item: { ...field, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between p-2 bg-white border rounded shadow-md mb-2 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <span>{field?.label || 'Unnamed Field'}</span> {/* Gracefully handle undefined labels */}
      <button
        onClick={() => onRemove(index)}
        className="text-red-500 hover:text-red-700 text-sm font-semibold"
      >
        Remove
      </button>
    </div>
  );
};


// Main component to build the form
const FormDropArea = ({ fields, onDrop, moveField, onRemove }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    drop: (item, monitor) => {
      if (item.isNew) {
        onDrop(item);
      }
    },
  });

  return (
    <div
      ref={drop}
      className={`p-4 border-dashed border-2 border-gray-300 rounded h-64 max-h-64 overflow-y-auto bg-gray-100`}
    >
      {fields.length === 0 ? (
        <p className="text-gray-400 text-center">Drop your first form field here to start...</p>
      ) : (
        fields.map((field, index) => (
          <DroppedField
            key={index}
            index={index}
            field={field}
            moveField={moveField}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
  );
};

// Main FormBuilder component
const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);

  // Adds a new field from the options list
  const handleDrop = (item) => {
    if (item.isNew) {
      // Ensure the dragged item has all required properties
      const newField = {
        type: item.type || 'text', // Default type if not provided
        label: item.label || 'New Field', // Default label if not provided
      };
      setFormFields((prev) => [...prev, { label: item.label || "Default Label" }]);
    }
  };

  // Removes a field
  const handleRemove = (index) => {
    setFormFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  // Reorders fields
  const moveField = (dragIndex, hoverIndex) => {
    const draggedField = formFields[dragIndex];
    const newFields = [...formFields];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);
    setFormFields(newFields);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Form</h2>
          <FormDropArea fields={formFields} onDrop={handleDrop} moveField={moveField} onRemove={handleRemove} />
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Input blocks</h2>
          <div className="space-y-2">
            <Field type="short-answer" label="Short answer" />
            <Field type="long-answer" label="Long answer" />
            <Field type="email" label="Email" />
            <Field type="number" label="Number" />
            <Field type="url" label="URL" />
            <Field type="file-upload" label="File upload" />
            <Field type="date" label="Date" />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
