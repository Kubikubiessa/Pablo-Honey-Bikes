import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Login from '../../components/login/Login';
import Register from '../../components/login/Register';
// import "./Login.css";
import "../contact/Contact.css";
import "animate.css";

const CustomerLogin = () => {
 
  const [login, { error: loginError }] = useMutation(LOGIN);
  const [addUser, { error: registerError }] = useMutation(ADD_USER);
  const [showLogin, setShowLogin] = useState(true);

  const toggleForms = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = async (loginFormData) => {
    try {
      const { data } = await login({ variables: { ...loginFormData } });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };
  // const handleRegisterSubmit = async (registerFormData) => {
  //   try {
  //     console.log("register form data", registerFormData);
  //     const { data } = await addUser({ variables: { ...registerFormData } });
  //     console.log("register data", data);
  //     Auth.login(data.addUser.token);
  //     console.log("register data and token",data.addUser.token);
  //   } catch (e) {
  //     console.error("Register Error:", e.message);
  //   }
  //   if (registerError) {
  //     console.error("Register Error:", registerError.message);
  //   }
  // };
  const handleRegisterSubmit = async (registerFormData) => {
    try {
       
      const { data } = await addUser({ variables: { ...registerFormData } });
      console.log("variables",  registerFormData);
      console.log("Mutation response data:", data);
      if (data && data.addUser && data.addUser.user) {
        Auth.login(data.addUser.token);
      } else {
        console.error("Registration failed: No user data returned.");
      }
    } catch (e) {
      console.error("Register Error:", e.message);
    }
  };
  

   

  return (
    <div className="contactContainer">
      {showLogin ? (
     <Login onToggle={toggleForms} onFormSubmit= {handleLoginSubmit} error= {loginError} />  
     
      ) : (
        <Register onToggle={toggleForms} onFormSubmit= {handleRegisterSubmit} error= {registerError}/>  
      )}
    </div>
  );
};

export default CustomerLogin;

