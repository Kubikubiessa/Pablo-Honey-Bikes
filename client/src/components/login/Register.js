import React, { useState } from 'react';
import Auth from '../../utils/auth';
import "../../pages/contact/Contact.css";
import "animate.css";

const  Register = ({onToggle, onFormSubmit, error}) => {
    const [FormState, setFormState] = useState({ username: '', email: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...FormState,
          [name]: value,
        });
        console.log("register form state", FormState);
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        onFormSubmit(FormState);
        //console.log("register form", FormState);
      }

      
      return (
        <>
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="form-box ">
          <h1>Registration</h1>
          <input name="username" type="text" placeholder="Username" value={FormState.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={FormState.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={FormState.password} onChange={handleChange} required />
          <input type="submit" value="" id="button" />
          {error && <div>Registration failed</div>}
          <p>
          Already have an account? <span onClick={onToggle} style={{ cursor: 'pointer' }}>Login here!</span>
        </p>
        </form>
       
      </>
      )
}

export default Register;