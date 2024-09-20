import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventForm = () => {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState('');
  const [eventD, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [skill, setSkill] = useState('');
  const [urgency, setUR] = useState('');
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [eventNameError, setEventNameError] = useState(false);
  const [DescriptionError, setDescriptionError] = useState(false);
  const [areaError, setAreaError] = useState(false);
  const [skillError, setSkillError] = useState(false);
  const [urgentError, setUrgentError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  

  const handleName = (setter, setError) => (event) => {
    const inputValue = event.target.value;
    setter(inputValue);
    const isLong = inputValue.length > 100;
    const isEmpty = inputValue.length === 0;
    if (isLong || isEmpty) {
      setError(true);
    } 
    else {
      setError(false);
    }
  };

  const handleText = (setter, setError) => (event) => {
    const textValue = event.target.value;
    setter(textValue);
    const isEmpty = textValue.length === 0;
    if (isEmpty) {
      setError(true);
    } 
    else {
      setError(false);
    }
  };

  const handleDropdownSkill = (setter, setError) => (event) => {
    const value = event.target.value;
    setSkill(value);
    if (value === '') {
      setError(true);
    } 
    else {
      setError(false);
    }
  };

  const handleDropdownUrgent = (setter, setError) => (event) => {
    const value = event.target.value;
    setUR(value);
    if (value === '') {
      setError(true);
    } 
    else {
      setError(false);
    }
  };

  const handleStartDate = (selectedDate) => {
    setStartDate(selectedDate);
    if (selectedDate) {
      setStartDateError(false); // Clear error if a valid date is selected
    } else {
      setStartDateError(true); // Set error if no date is selected
    }
  };

  const handleEndDate = (selectedDate) => {
    setEndDate(selectedDate);
    if (selectedDate) {
      setEndDateError(false); // Clear error if a valid date is selected
    } else {
      setEndDateError(true); // Set error if no date is selected
    }
  };

  const validateDates = () => {
    if (!startDate) {
      setStartDateError(true); // if empty, set error
    }
    if (!endDate) {
      setEndDateError(true); // if empty, set error
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (eventName === ''){
      setEventNameError(true)};
    if (eventD === ''){
      setDescriptionError(true)};
    if (area === ''){
      setAreaError(true)};
    if (skill === ''){
      setSkillError(true)};
    if (urgency === ''){
      setUrgentError(true)};
    if (startDate === ''){
      setStartDateError(true)};
    if (endDate === ''){
        setEndDateError(true)};
    if (!eventNameError && !DescriptionError && !areaError && !skillError && !urgentError && !startDateError && !endDateError &&
        eventName && eventD && area && skill && urgency && startDate && endDate) {
      console.log('Form Save');
      navigate('/save'); // Navigate to save page
    } 
    else {
      console.log('Error: Invalid input');
    }

  };

  return (
  <div className="full-w w-screen min-h-screen font-black bg-[url('/manager.png')] space-y-16 bg-cover bg-center -mt-11">
    <div className="flex-grow flex items-center justify-center">
      <img src="/logo.png" alt="Logo Image" className="max-w-xs w-44 h-auto mt-5"/>
    </div>
    <div className="grid grid-cols-1">
        <div className="flex flex-col items-center justify-center h-144 mx-auto p-6 rounded-lg bg-stone-50 -mt-11 max-w-2xl">
          <div className="space-y-3 w-full">

            {/* Event Name Input */}
            <input
              type="text"
              placeholder="Event Name *"
              value={eventName}
              onChange={handleName(setEventName, setEventNameError)}
              maxLength={100} /* limit length to 50 characters */
              className={`pl-3 text-left rounded-md border-2 w-full h-12 font-light placeholder-slate-400 ${eventNameError ? 'border-red-500' : 'border-gray-600'}`}
            />

            {/*textarea*/}
            {/* Event Description Textarea */}
            <textarea
              placeholder="Event Description *"
              value={eventD}
              onChange={handleText(setDescription, setDescriptionError)}
              className={`pl-3 pt-2 text-left rounded-md border-2 w-full h-12 font-light placeholder-slate-400 ${DescriptionError ? 'border-red-500' : 'border-gray-600'}`}
            />
            {/* Location Textarea */}
            <textarea
              placeholder="Location (address, city, state, zip) *"
              value={area}
              onChange={handleText(setArea, setAreaError)}
              className={`pl-3 pt-2 text-left rounded-md border-2 w-full h-12 font-light placeholder-slate-400 ${areaError ? 'border-red-500' : 'border-gray-600'}`}
            />

            {/*Dropdowns*/}
            <div className="flex items-center space-x-4">

              {/* Require Skill Dropdown*/}
              <div className="flex-1"> 
                <label htmlFor="skill"></label>
                <select
                  id="skill"
                  value={skill}
                  onChange={handleDropdownSkill(setSkill, setSkillError)}
                  className={`pl-3 pr-4 text-left rounded-md border-2 w-72 h-12 font-light placeholder-slate-400 ${skillError ? 'border-red-500' : 'border-gray-600'}`}
                >
                <option value="" disabled>Select a skill *</option>
                <option value="skill1">Dental</option>
                <option value="skill2">Nurse</option>
                <option value="skill3">Pharm Tech</option>
                </select>
              </div>

              {/* Urgency Dropdown */}
              <div className="flex-1"> 
                <label htmlFor="urgency"></label>
                <select
                  id="urgency"
                  value={urgency}
                  onChange={handleDropdownUrgent(setUR, setUrgentError)}
                  className={`pl-3 pr-4 text-left rounded-md border-2 w-72 h-12 font-light placeholder-slate-400 ${urgentError ? 'border-red-500' : 'border-gray-600'}`}
                >
                <option value="" disabled>N/A *</option>
                <option value="option1">Urgency</option>
                <option value="option2">Non-urgent</option>
                </select>
              </div>
            </div>

            {/* Event Data */}
            <div className="flex items-center space-x-4">
            <DatePicker
              selectsStart
              selected={startDate}
              onChange={handleStartDate}
              placeholderText="Start Date *"
              startDate={startDate}
              className={`flex p-2 pr-4 rounded-md border-2 font-light w-72 h-12 ${startDateError ? 'border-red-500' : 'border-gray-600'}`}/>

            <DatePicker
              selectsEnd
              selected={endDate}
              onChange={handleEndDate}
              placeholderText="End Date *"
              endDate={endDate}
              startDate={startDate}
              minDate={startDate}
              className={`flex p-2 pr-4 rounded-md border-2 font-light w-72 h-12 ${startDateError ? 'border-red-500' : 'border-gray-600'}`}/>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              className="transition ease-in-out delay-500 hover:-translate-y-1 hover:scale-110 hover:bg-sky-500 duration-100 pl-3 rounded-full bg-cyan-600 w-60 h-12 font-extrabold"
            >
              <p className="text-slate-50">
                Save Event
              </p>
            </button>
          </div>
        </div>
      </div>
  </div>

  );
};

export default EventForm;