// EditableFormField.js
import React, { useContext } from "react";
import { FormContext } from "./FormContext";

const EditableFormField = ({ index, field }) => {
  const { updateField, deleteField } = useContext(FormContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(index, { ...field, [name]: value });
  };

  const handleDelete = () => {
    deleteField(index);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md space-y-2 relative">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">Field Label:</label>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
      <input
        name="label"
        value={field.label}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        placeholder="Field label"
      />

      <label className="block text-sm font-medium">Placeholder:</label>
      <input
        name="placeholder"
        value={field.placeholder}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        placeholder="Placeholder text"
      />

      <label className="block text-sm font-medium">Type:</label>
      <select
        name="type"
        value={field.type}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="email">Email</option>
        <option value="textarea">Textarea</option>
      </select>
    </div>
  );
};

export default EditableFormField;
