import React from 'react';
import FacebookLogin from 'react-facebook-login';

const LoginForm = (props) => {
  const handleFacebookCallback = (response) => {
    if (response?.status === "unknown") {
        console.error('Sorry!', 'Something went wrong with facebook Login.');
     return;
    }
    console.log(response);
      // console will print following object for you.
       
   }

  return (
    <FacebookLogin 
      buttonStyle={{padding:"6px"}}  
      appId="1045168203957745"  // we need to get this from facebook developer console by setting the app.
      autoLoad={false}  
      fields="name,email,picture"  
      callback={handleFacebookCallback}/>
  );
};
export default LoginForm;