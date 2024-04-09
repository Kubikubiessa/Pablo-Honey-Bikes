import React, { useState } from "react";
import { useNavigate, useContext } from "react-router-dom";
import jsPDF from 'jspdf';
import axios from 'axios';
import ContractTemplate from "./ContractTemplate";
import UserContext from "../auth/UserContext"; //will need to talk to front end to put currentUser in UserContext
import './proposedContract.css';


/** Show page with the proposed contract
 **/

function ProposedContract({propertyId, leaseTerm, price, startDate, endDate}) { //need to talk to front end to pass this info using useState

  console.debug("ProposedContract");

  const navigate  = useNavigate();

  const { currentUser } = useContext(UserContext);

  const name = currentUser.name;

  const email = currentUser.email;

  const cell = currentUser.cell;

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString();


  const [checked, setChecked] = useState(false);

  const [signature, setSignature] = useState(null);


  function handleCheckboxChange() {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };


  function handleSignatureChange(evt) {
    const { value } = evt.target;
    setSignature(value);
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });


  async function PDFGenerator () {
    const doc = new jsPDF();
    doc.text('BIKE RENTAL CONTRACT', 10, 10); //Need to write function to pull the required legal terms and pass in the user & rental info here
    //Also need to make sure to fill in the digital signature of the user
    
    doc.save('generated.pdf'); // Browser will prompt the user to save the pdf in a local storage

    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    let body = await toBase64(pdfBlob);

    //store pdf in the database:
    axios.post('https://h4gapp3h6bel3k33gpsl7nsvbm0ttzdm.lambda-url.us-east-2.on.aws/store-contract', {'pdfBlob':body}) 
      .then(response => {
        console.log('PDF uploaded successfully:', response.data);
      })
      .catch(error => {
        console.error('Error uploading PDF:', error);
      });
    }
  
  
  async function handleConfirmClick (evt) {
    evt.preventDefault();
    if (!checked) {
     
      alert("Please read through the contract and check off the checkbox first!")
    } else if(!signature) {
    
      alert("Please sign first!")
      
    } 
    else if(signature !== name) {
    //   setShowAlert(true);
    //   <Alert
    //     message="Please make sure to sign your legal name correctly first!"
    //     onClose={handleCloseAlert}
    //   />
    } 
    else {
      PDFGenerator();
      navigate('/home'); // Redirect to homepage
      //write booking in the database:
    //   axios.post('https://tlh15i0e9a.execute-api.us-west-1.amazonaws.com/staging/write', {name, propertyId, startDate, endDate}) 
    //   .then(response => {
    //     console.log('Booking written successfully:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error writing booking:', error);
    //   });
    }
  }


  function handleGoBackClick () {
    navigate('/abc'); //need to work with frond end to figure out the URL
  }


  return (
    <div>
      <h2>Please review the proposed contract below:</h2>
      <div><ContractTemplate
              name={name}
              email={email}
              cell={cell}
              propertyId={propertyId}
              leaseTerm={leaseTerm}
              price={price}
              date={formattedDate}
            />
      </div>
      <div>
        <label id="checkbox">
          <input 
            type="checkbox"
            onChange={handleCheckboxChange} 
          />
          I have read and agreed to all the terms listed above.
        </label>
      </div>
      <div>
        <label id="signature">
          Legal Name:
          <input 
            type="text"
            name="signature"
            value={signature}
            onChange={handleSignatureChange}
          />
        </label>
      </div>
      <div id="button-container">
        <button onClick={handleConfirmClick}>Confirm</button>
        <button onClick={handleGoBackClick}>Go Back to Prev</button>
      </div>
    </div>
  )
}

export default ProposedContract;