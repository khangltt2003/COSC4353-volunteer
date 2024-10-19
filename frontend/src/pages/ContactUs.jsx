import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.avif";

const ContactUs = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  
  // New state for the overall error message
  const [formError, setFormError] = useState("");

  const handleName = (setter, setError) => (event) => {
    const inputValue = event.target.value;
    const nameType = /^[a-zA-Z\s]+$/;
    setter(inputValue);
    const isValid = nameType.test(inputValue);
    const isLong = inputValue.length > 50;
    const isEmpty = inputValue.length === 0;
    if (!isValid || isLong || isEmpty) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleEmail = (setter, setError) => (event) => {
    const inputValue = event.target.value;
    const emailType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular email format
    setter(inputValue);
    const isValid = emailType.test(inputValue);
    const isEmpty = inputValue.length === 0;
    if (!isValid || isEmpty) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleMessage = (setter, setError) => (event) => {
    const inputValue = event.target.value;
    setter(inputValue);
    const isEmpty = inputValue.length === 0;
    if (isEmpty) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset error message and field errors
    setFormError("");
    setFirstNameError(firstName.length === 0);
    setLastNameError(lastName.length === 0);
    setEmailError(email.length === 0);
    setMessageError(message.length === 0);

    // Check if any fields are empty
    if (!firstName || !lastName || !email || !message) {
      setFormError("Please fill out all required fields."); 
      return; 
    }

    // Proceed to submission
    console.log("Submit");
    navigate("/submit");
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="grid grid-cols-1">
        <div className="flex flex-col items-center justify-center gap-4 h-auto mx-auto p-6 rounded-lg mt-32 mb-20 w-2/5 bg-teal-600">
          <p className="w-screen text-white bg-cover bg-center text-5xl text-center flex items-center justify-center font-medium mb-8">
            Contact Us
          </p>

          {/* Display the error message here */}
          {formError && (
            <p className="text-red-500 text-center mb-4">{formError}</p>
          )}

          {/* First Name Input */}
          <input
            type="text"
            placeholder="First Name *"
            value={firstName}
            onChange={handleName(setFirstName, setFirstNameError)}
            maxLength={50} 
            className={`pl-3 text-left rounded-md w-full h-12 font-light placeholder-slate-400 ${
              firstNameError ? "border-red-500" : "border-teal-600"
            }`}
          />
          {/* Last Name Input */}
          <input
            type="text"
            placeholder="Last Name *"
            value={lastName}
            onChange={handleName(setLastName, setLastNameError)}
            maxLength={50} 
            className={`pl-3 text-left rounded-md w-full h-12 font-light placeholder-slate-400 ${
              lastNameError ? "border-red-500" : "border-teal-600"
            }`}
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="youremail@example.com *"
            value={email}
            onChange={handleEmail(setEmail, setEmailError)}
            maxLength={125}/* limit length to 125 characters */
            className={`pl-3 text-left rounded-md w-full h-12 font-light placeholder-slate-400 ${
              emailError ? "border-red-500" : "border-teal-600"
            }`}
          />
          {/* Message Textarea */}
          <textarea
            placeholder="Message"
            value={message}
            onChange={handleMessage(setMessage, setMessageError)}
            maxLength={500} /* limit length to 500 characters */
            className={`pl-3 text-left rounded-md w-full h-auto min-h-40 font-light placeholder-slate-400 ${
              messageError ? "border-red-500" : "border-teal-600"
            }`}
          />
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-teal-500 pl-3 rounded-full bg-teal-800 w-60 h-12 font-bold"
          >
            <p className="text-slate-50">Send Message</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
