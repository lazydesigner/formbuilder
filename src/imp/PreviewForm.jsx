// PreviewForm.js
import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";

const PreviewForm = () => {
  const { formFields, addResponse } = useContext(FormContext);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addResponse(formData);
    setFormData({});
  };

  return (
    <div className="mt-8 p-6 bg-white rounded shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Form Preview</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <input
              type={field.type}
              name={`field-${index}`}
              placeholder={field.placeholder}
              value={formData[`field-${index}`] || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PreviewForm;
