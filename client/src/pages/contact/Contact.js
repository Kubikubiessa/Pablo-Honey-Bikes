import React, { useRef, useEffect } from "react";
import "./Contact.css";
import  Email  from "../../components/email/Email";

import "animate.css";

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    document.title = ` Easy-FDA | About `;
  }, []);

 

  return (
    <div className="contactContainer">
      <form ref={form} onSubmit={Email}>
        <h1>Contact Us Form</h1>
        <input
          type="text"
          id="firstName"
          name="first_name"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          id="lastName"
          name="last_name"
          placeholder="Last Name"
          required
        />
        <input type="email" id="email" placeholder="Email" required />
        <input type="text" id="mobile" placeholder="Mobile" required />
        <h4>Type Your Message Here...</h4>
        <textarea required name="feedback"></textarea>
        <input type="submit" value="Send" id="button" />
      </form>
    </div>
  );
};

export default Contact;