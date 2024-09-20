import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import LoginImg from '../assets/login2.jpg';
import LogoImg from '../assets/Logo.jpg';
import {BiUser} from 'react-icons/bi';
import {AiFillLock} from 'react-icons/ai';

export default function Login2() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (username === 'user' && password === 'pass') {
        setError('');
        alert('Login successful!');
      } else {
        setError('Incorrect username or password');
      }
    };
  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img className=" absolute w-full h-full object-cover mix-blend-overlay" src={LoginImg} alt="Login" />
      <div className='relative flex justify-center items-center h-full'>
            <form className='max-w-[400px] w-full mx-auto bg-white p-8'>
                <img className='w-24 h-25 rounded-full object-cover mx-auto mb-4' src={LogoImg} alt="Logo" />
                <div className='relative mb-4'>
                    <label className='flex flex-col py-2 '>Username</label>
                    <div className='relative'>
                        <input
                            className='w-full border p-2'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter your username'
                            />
                        <BiUser className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600' />
                    </div>
                </div>
                <div className='relative mb-4'>
                    <label className='flex flex-col py-2'>Password</label>
                    <div className='relative mb-4'>
                        <input
                            className='w-full border p-2'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password'
                            />
                        <AiFillLock className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600' />
                    </div>
                </div>
                <button
            className='border w-full mt-8 py-3 bg-blue-400 hover:bg-blue-300 text-white'
            type='submit'
          >
            Login
          </button>
          {error && <p className='text-red-500 text-center'>{error}</p>}
                <div className='flex justify-between'>
                    <p className='justify-center mt-2'>
                    <input type='checkbox' /> Remember Me
                    </p>
                </div>
                <p className='text-center mt-8'>
                    <span>Not a Member? <Link to='/Register' className='text-blue-700 hover:text-blue-400'> Create an Account </Link> </span>
                </p>
            </form>
        </div>
    </div>
  )
}