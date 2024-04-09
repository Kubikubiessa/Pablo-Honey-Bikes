import React, { useState } from 'react';
import Auth from '../../utils/auth';
import "../../pages/contact/Contact.css";
import "animate.css";

const Login = ({onToggle, onFormSubmit, error }) => {
    const [loginFormState, setLoginFormState] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginFormState({
          ...loginFormState,
          [name]: value
        });
      };
      const handleLoginSubmit = async (event) => {
        event.preventDefault();
        onFormSubmit(loginFormState);
      }

      return (
        <>
        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="form-box">
          <h1>Login</h1>
          <input type="email" name="email" placeholder="Enter your email" value={loginFormState.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter your password" value={loginFormState.password} onChange={handleChange} required />
          <input type="submit" value="Login" id="button" />
          {error && <div>Login failed</div>} 
          <p>
          Don't have an account yet? <span onClick={onToggle} style={{ cursor: 'pointer' }}>Sign up here!</span>
        </p> 
        </form>
      
      </>
      )
}

export default Login;