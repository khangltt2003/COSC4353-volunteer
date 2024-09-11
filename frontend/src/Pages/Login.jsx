import React from 'react'

import loginImg from '../assets/hearthand.jpg'
import LogoImg from '../assets/Logo.jpg'

export default function Login() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt=""/>
        </div>
        <div className = 'bg-gray-200 flex flex-col justify-center'>
            <form className="max-w-[400px] w-full mx-auto rounded-lg bg-white p-4">
            <img className=' w-24 h-25 rounded-full object-cover py-6 mx-auto' src={LogoImg} alt=""/>
                <div>
                    <label className='flex flex-col py-2'>Username</label>
                    <input className='w-full border p-2'type = "username"/>
                </div>
                <div>
                    <label className='flex flex-col py-2'>Password</label>
                    <input className='w-full border p-2'type = "password"/>
                </div>
                <button className='border w-full my-5 py-2 bg-blue-400 hover:bg-blue-300 text-white' type='Submit'> Sign In</button>
                <div className='flex justify-between'>
                    <p className='flex items-center'><input className='mr-2' type = "checkbox"/> Remember me</p>
                    <p><button className='text-black hover:text-gray-400 bg-transparent border-none'
                    onClick={() => alert('Redirecting to create an account page...')}>Create an account</button></p>
                </div>
            </form>
        </div>
    </div>
  )
}
