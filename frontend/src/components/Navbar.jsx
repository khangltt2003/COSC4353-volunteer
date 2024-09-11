import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center h-24 justify-between mx-auto px-4 text-black">
      <h1 className="w-full text-3xl font-bold text-[#d83c3c]">Logo</h1>
      <ul className = 'flex '>
        <li className='p-4'>Event</li>
        <li className='p-4'>Emergency</li>
        <li className='p-4'>Recruit Volunteers</li>
        <li className='p-4'> About</li>
        <li className='p-4'> Login</li>
      </ul>
    </div>
  )
}

export default Navbar

