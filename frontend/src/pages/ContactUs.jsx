import { set } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [error, setError] = useState('');

  const handleName = (setter, setError) => (event) => {
    const inputValue = event.target.value;
    const nameType = /^[a-zA-Z\s]+$/; // valid name type
    setter(inputValue);
    const isValid = nameType.test(inputValue);
    const isLong = inputValue.length > 50;
    const isEmpty = inputValue.length === 0;
    if(!isValid || isLong || isEmpty){ //if there is an error
      setError('please enter a valid name');
    }
    else{
      setError(false);
    }
  }

  const handleEmail = (setter, setError) => (event) => {
    const inputValue = event.target.value;
    const emailType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular email format
    setter(inputValue);
    const isValid = emailType.test(inputValue);
    const isEmpty = inputValue.length === 0; // if email is empty
    if (!isValid || isEmpty) { // if there is an error
      setError('please enter a valid email');
    } else {
      setError(false);
    }
  }
  
  const handleMessage = (setter, setError) =>(event) => {
    const inputValue = event.target.value;
    setter(inputValue);
    const isEmpty = inputValue.length === 0; // if message is empty
    if(isEmpty){ // if there is an error
      setError('please enter your message');
    }
    else{
      setError(false);
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault(); 
    setError('');
    if(!firstNameError && !lastNameError && !emailError && !messageError && firstName && lastName && email && message) { //if there are no errors
      console.log('Submit');
      navigate('/submit');
    } else {
      // if there are errors, set error state to true and show error message in terminal
      if (firstName.length === 0){
        setFirstNameError('Please enter your valid first name');
      }
      if (lastName.length === 0) {
        setLastNameError('Please enter your valid last name');
      }
      if (email.length === 0) {
        setEmailError('Please enter your valid email');
      }
      if (message.length === 0) {
        setMessageError('Please enter your message');
      }
      console.log('Error: Invalid input');
    }
  }
  

  return (
    <div className="full-w w-screen min-h-screen font-black bg-yellow-50 space-y-16 bg-cover bg-center">
      <p className="p-15 full-w -mt-10 text-cyan-600 bg-[url('/calling.png')] bg-cover bg-center w-screen h-48 text-5xl text-center flex items-center justify-center">
        Contact Us
      </p>

      <div className="grid grid-cols-1">
        <div className="flex flex-col items-center justify-center h-auto mx-auto p-6 rounded-lg bg-orange-200 mt-5 w-2/5">
          <div className="flex-grow flex items-center justify-center mb-4">
            <img src="/logo.png" alt="Logo Image" className="w-1/4 h-auto"/> {/* Logo Image */}
          </div>

          <div className="space-y-4 w-full">
            {/* First Name Input */}
            <div>
              {firstNameError && <p className="text-red-500 mt-2 font-bold">{firstNameError}</p>}
            </div>

            <input
              type="text"
              placeholder="First Name *"
              value={firstName}
              onChange={handleName(setFirstName, setFirstNameError)}
              maxLength={50} /* limit length to 50 characters */
              className={`pl-3 text-left rounded-md border-2 w-full h-12 font-light placeholder-slate-400 ${firstNameError ? 'border-red-500' : 'border-gray-600'}`}
            />

            {/* Last Name Input */}
            <div>
              {lastNameError && <p className="text-red-500 mt-2 font-bold">{lastNameError}</p>}
            </div>
            <input
              type="text"
              placeholder="Last Name *"
              value={lastName}
              onChange={handleName(setLastName, setLastNameError)}
              maxLength={50} /* limit length to 50 characters */
              className={`pl-3 text-left rounded-md border-2 w-full h-12 font-light placeholder-slate-400 ${lastNameError ? 'border-red-500' : 'border-gray-600'}`}
            />

            {/* Email Input */}
            <div>
              {emailError && <p className="text-red-500 mt-2 font-bold">{emailError}</p>}
            </div>
            <input
              type="email"
              placeholder="youremail@example.com *"
              value={email}
              onChange={handleEmail(setEmail, setEmailError)}
              maxLength={125} /* limit length to 125 characters */
              className={`pl-3 text-left rounded-md border-2 w-full h-12 font-light placeholder-slate-400 ${emailError ? 'border-red-500' : 'border-gray-600'}`}
            />
            {/* Message Textarea */}
            <div>
              {messageError && <p className="text-red-500 mt-2 font-bold">{messageError}</p>}
            </div>
            <textarea
              placeholder="Message"
              value={message}
              onChange={handleMessage(setMessage, setMessageError)}
              maxLength={500} /* limit length to 500 characters */
              className={`pl-3 text-left rounded-md border-2 w-full h-auto min-h-40 font-light placeholder-slate-400 ${messageError ? 'border-red-500' : 'border-gray-600'}`}
            />
            {/* Submit Button */}
            <button 
              onClick={handleSubmit} // if there are no errors, navigate to submit page
              className="transition ease-in-out delay-500 hover:-translate-y-1 hover:scale-110 hover:bg-sky-500 duration-100 pl-3 rounded-full bg-cyan-600 w-60 h-12 font-extrabold"
            >
              <p className="text-slate-50">
                Send Message
              </p>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center w-full h-full bg-[url('/bottom.png')] bg-cover bg-center pt-10">
        <div className="flex justify-center items-center mb-4">
          <img src="/logo.png" alt="Logo Image" className="w-32 h-auto" /> {/* Logo Image */}
        </div>
  
        <div className="flex flex-col items-center justify-center text-center">
         <p className="pb-5 text-slate-950/75 text-3xl font-serif">
            TALKConnect
          </p>
          <p className="font-light text-slate-950 text-xl mb-5">
            Email:
          </p>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;



