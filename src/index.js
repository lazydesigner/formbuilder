import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <FormProvider>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <FormBuilder />
          <Responses />
        </div>
      </div>
    </FormProvider> */}
    <GoogleOAuthProvider clientId='57362394680-d7rnjmqqsmtj2fg24runmrhm6eu8l13m.apps.googleusercontent.com'>
      <App />
  </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
