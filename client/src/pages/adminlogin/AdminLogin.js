import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { ADMIN_LOGIN, ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Login from '../../components/login/Login';
import Register from '../../components/login/Register';
// import "./Login.css";
import "../contact/Contact.css";
import "animate.css";
// Import React, useState, useMutation from '@apollo/client', the ADMIN_LOGIN mutation, Auth, and components
const AdminLogin = () => {
  const navigate = useNavigate();
  const [login, { error: loginError }] = useMutation(ADMIN_LOGIN);
  const [addUser, { error: registerError }] = useMutation(ADD_USER);
  const [showLogin, setShowLogin] = useState(true);

  const toggleForms = () => setShowLogin(!showLogin);

  const handleLoginSubmit = async (loginFormData) => {
    try {
      const { data } = await login({ variables: loginFormData });
      if (data.adminLogin.token) {  
        Auth.login(data.adminLogin.token, () => navigate("/admindash"));
    
      } else {
        console.error("Login succeeded but no token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const handleRegisterSubmit = async (registerFormData) => {
        try {
          const { data } = await addUser({ variables: { ...registerFormData } });
          Auth.login(data.addUser.token);
        } catch (e) {
          console.error(e);
        }
      };

  return (
    <div className="contactContainer">
      {showLogin ? (
        <Login onToggle={toggleForms} onFormSubmit={handleLoginSubmit} error={loginError} />
      ) : (
        <Register onToggle={toggleForms} onFormSubmit= {handleRegisterSubmit} error= {registerError}/>  
      )}
    </div>
  );
};

export default AdminLogin;

