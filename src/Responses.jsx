// Responses.js
import React, { useContext } from "react";
import { FormContext } from "./FormContext";

const Responses = () => {
  const { responses } = useContext(FormContext);

  return (
    <div className="container mx-auto p-4 mt-8 bg-white rounded shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Responses</h3>
      <ul className="space-y-2">
        {responses.map((response, index) => (
          <li key={index} className="bg-gray-50 p-3 rounded border">
            {JSON.stringify(response)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Responses;
