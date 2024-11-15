// FormContext.js
import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formFields, setFormFields] = useState([]);
  const [responses, setResponses] = useState([]);

  const addField = (field) => {
    setFormFields([...formFields, field]);
  };

  const updateField = (index, updatedField) => {
    const updatedFields = formFields.map((field, i) =>
      i === index ? updatedField : field
    );
    setFormFields(updatedFields);
  };

  const deleteField = (index) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  const addResponse = (response) => {
    setResponses([...responses, response]);
  };

  return (
    <FormContext.Provider
      value={{ formFields, addField, updateField, deleteField, responses, addResponse }}
    >
      {children}
    </FormContext.Provider>
  );
};
