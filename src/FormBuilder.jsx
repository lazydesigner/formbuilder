// FormBuilder.js
import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";
import PreviewForm from "./PreviewForm";
import EditableFormField from "./FormFieldEditor";

const FormBuilder = () => {
  const { formFields, addField } = useContext(FormContext);
  const [fieldType, setFieldType] = useState("text");

  const handleAddField = () => {
    addField({ type: fieldType, label: "New Field", placeholder: "Enter text" });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Form Builder</h2>
      
      <div className="flex items-center space-x-4 mb-4">
        <select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="textarea">Textarea</option>
        </select>
        <button
          onClick={handleAddField}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Field
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {formFields.map((field, index) => (
          <EditableFormField key={index} index={index} field={field} />
        ))}
      </div>
      
      <PreviewForm />
    </div>
  );
};

export default FormBuilder;
