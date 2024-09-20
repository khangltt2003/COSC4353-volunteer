import React, { useState } from 'react';
import loginImg from '../assets/hearthand.jpg';
import LogoImg from '../assets/Logo.jpg';

export default function Login() {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt="Background" />
      </div>
      <div className='bg-gray-200 flex flex-col justify-center'>
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-white p-4" onSubmit={handleSubmit}>
          <img className='w-24 h-25 rounded-full object-cover mx-auto' src={LogoImg} alt="Logo" />
          <div>
            <label className='flex flex-col py-2'>Username</label>
            <input
              className='w-full border p-2'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
            />
          </div>
          <div>
            <label className='flex flex-col py-2'>Password</label>
            <input
              className='w-full border p-2 '
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
            />
          </div>
          <button
            className='border w-full my-5 py-2 bg-blue-400 hover:bg-blue-300 text-white'
            type='submit'
          >
            Sign In
          </button>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <div className='flex justify-between'>
            <p className='flex items-center'>
              <input className='mr-2' type='checkbox' /> Remember me
            </p>
            <button
              className='text-black hover:text-gray-400'
              onClick={() => alert('Redirecting to create an account page...')}
            >
              Create an Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}