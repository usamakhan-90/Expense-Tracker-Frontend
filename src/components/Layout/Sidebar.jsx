import React from 'react'

function Sidebar() {
  return (
    <>
    <div className='w-64 h-[calc(100vh-61px)] bg-white border border-r border-gray-200/50 p-5 sticky top-[61px] z-20 md:hidden'>
    <ul className='space-y-2'>
        <li>Home</li>
        <li>About Us</li>
    </ul>
    </div>
    </>
  )
}

export default Sidebar