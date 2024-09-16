import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordChecklist from 'react-password-checklist';
import LoginImg from '../assets/loginmed.jpg';
import LogoImg from '../assets/Logo.jpg';
import {BiUser} from 'react-icons/bi';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { ImCheckmark  } from "react-icons/im";


export default function Register() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    cmpassword: ''
  });
  const [visible, setVisible] = useState(false);
  const navigate =useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      const isValid = /^[a-zA-Z0-9]+$/.test(value) && value.length >= 8 && value.length <= 50;
      setIsUsernameValid(isValid);
      
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (formData.password === formData.cmpassword && isUsernameValid && isPasswordValid) {

        toast.success('Registration is successful!\n Please log in.');
        console.log('Registration is successful!');
        setTimeout(() => navigate('/loginpage'), 2000);
      } else {

        toast.error('Error occurred during registration!');
      }
    } catch (err) {

      toast.error('Error occurred during registration!');
      setError('Error occurred during registration!');
    }
  };
  return (
    

  <div className="relative w-full h-screen bg-[#4a5568]">
    <img className=" absolute w-full h-full object-cover mix-blend-overlay" src={LoginImg} alt="Login" />
    <Link to="/Homepage">
      <button className="absolute top-4 left-4 z-10 hover:shadow-lg transition-transform duration-300 rounded-full hover:scale-110">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-cyan-800 rounded-full blur-lg shadow-lg w-24 h-24" />
        </div>
        <img className=" relative w-24 h-24 rounded-full object-cover" src={LogoImg} alt="Logo" />
      </button>
    </Link>


      <div className='relative flex justify-center items-center h-full '>
      <form className='form-large-text max-w-[500px] w-full  bg-white p-6 rounded-lg shadow-form-shadow' onSubmit={handleSubmit}>
        <h1 className=' text-5xl text-main font-bold text-center mb-20 mt-8 '>TALKConnect</h1>
          <div className='relative mb-2'>
              <label className='flex flex-col py-2 '>Username</label>
              <div className='relative'>
                  <input
                      className='w-full border p-2 rounded-lg'
                      type='text'
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                      placeholder='Enter your username'
                      />
                  {!isUsernameValid && (
                    <BiUser className='absolute top-1/4 right-4 transform-translate-y-1/2 text-gray-600' />
                  )}

                  {isUsernameValid && formData.username.length > 0 && (
                    <ImCheckmark className='absolute top-1/4 right-2 transform-translate-y-1/2 text-green-500'/>

                  )}     
              </div>
              {!isUsernameValid && formData.username.length > 0 && (
              <p className='text-red-500 text-sm mt-1'>Username must be at least 8 characters and contain only letters and numbers.</p>
            )}
          </div>
          <div className='relative mb-'>
              <label className='flex flex-col py-2'>Password</label>
              <div className='relative mb-2'>
                  <input
                      className='w-full border p-2 rounded-lg password-checklist'
                      type={visible ? 'text' :'password'}
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      placeholder='Enter your password'
                      />
                  <div className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600'>
                    {visible ? (<FaEyeSlash onClick={() => setVisible(!visible)} />) : (<FaEye onClick={() => setVisible(!visible)} />)}
                  </div>
              </div>
          </div>
          <div className='relative mb-4'>
              <label className='flex flex-col py-2'> Confirm Password</label>
              <div className='relative mb-2'>
                  <input
                      className='w-full border p-2 rounded-lg'
                      type={visible? 'text':'password'}
                      name='cmpassword'
                      value={formData.cmpassword}
                      onChange={handleChange}
                      placeholder='Re-enter your password'
                      />
                  <div className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600'>
                    {visible ? (<FaEyeSlash onClick={() => setVisible(!visible)} />) : (<FaEye onClick={() => setVisible(!visible)} />)}
                  </div>
              </div>
          </div>
          {formData.password.length > 0 && (
            <div className= "mb-">
              <PasswordChecklist
                className="password-checklist small-checklist"
                rules={["minLength", "specialChar", "number", "capital", "match"]}
                minLength={8}
                value={formData.password}
                valueAgain={formData.cmpassword}
                onChange={(isValid) => {
                  console.log('Password Valid State Before:', isPasswordValid);
                  setIsPasswordValid(isValid);
                  console.log('Password Valid State After:', isValid);
                }}
              />
            </div>
          )}
          <button
            className='border w-full mt-8 py-3 rounded-lg bg-main hover:bg-cyan-500 text-white'
            type='submit'
            >Sign Up
          </button>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <p className='text-center mt-6'>
              <span>Already a Member? <Link to='/loginpage' className='text-main hover:text-blue-400'> Sign In </Link> </span>
          </p>
      </form>
    </div>
    <ToastContainer />
  </div>
)
}