import React, { useRef, useEffect } from "react";
 
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Email = (e) => {
    e.preventDefault();
    const form = useRef();
    emailjs
      .sendForm(
        "service_c91mm1b",
        "template_86th9be",
        form.current,
        "F5832ZDfVw0AeBGoM"
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            Swal.fire({
              icon: "success",
              title: "Email Sent",
              text: "Thanks for your feedback!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Email Send failed",
              text: "Sorry, please try it later.",
            });
          }
        },
        (error) => {
          console.error(error.text);
          Swal.fire({
            icon: "error",
            title: "Email Send failed",
            text: "Sorry, please try it later.",
          });
        }
      );
  };
  export default Email;