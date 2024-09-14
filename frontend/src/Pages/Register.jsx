import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import LoginImg from '../assets/loginmed.jpg';
import LogoImg from '../assets/Logo.jpg';
import {BiUser} from 'react-icons/bi';
import {AiFillLock} from 'react-icons/ai';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


export default function Login2() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cmpassword, setCmPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
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
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-cyan-700 rounded-lg blur-lg shadow-xl w-full max-w-[505px] h-full max-h-[705px]" />
        </div>
        <div className='relative flex justify-center items-center h-full'>
        <form className='form-large-text max-w-[500px] w-full max-h-[700px] h-full mx-auto bg-white p-6 rounded-lg' onSubmit={handleSubmit}>
          <h1 className=' text-5xl text-main font-bold text-center mb-20 mt-8 '>TALKConnect</h1>
            <div className='relative mb-2'>
                <label className='flex flex-col py-2 '>Username</label>
                <div className='relative'>
                    <input
                        className='w-full border p-2 rounded-lg'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter your username'
                        />
                    <BiUser className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600' />
                </div>
            </div>
            <div className='relative mb-'>
                <label className='flex flex-col py-2'>Password</label>
                <div className='relative mb-2'>
                    <input
                        className='w-full border p-2 rounded-lg'
                        type={visible ? 'text' :'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={cmpassword}
                        onChange={(e) => setCmPassword(e.target.value)}
                        placeholder='Re-enter your password'
                        />
                    <div className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600'>
                      {visible ? (<FaEyeSlash onClick={() => setVisible(!visible)} />) : (<FaEye onClick={() => setVisible(!visible)} />)}
                    </div>
                </div>
            </div>
            <button
              className='border w-full mt-8 py-3 rounded-lg bg-main hover:bg-cyan-500 text-white'
              type='submit'
              >Sign Up
            </button>
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <p className='text-center mt-10'>
                <span>Already a Member? <Link to='/loginpage' className='text-main hover:text-blue-400'> Sign In </Link> </span>
            </p>
        </form>
      </div>
    </div>
  )
}