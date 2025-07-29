import React from 'react'
import home from '../../assets/images/home.jpeg'
function AuthLayout({children}) {
  return (
    <>
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60%] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {
          children
        }
      </div>

      <div className='w-[40%] bg-violet-300 hidden md:flex justify-center items-center'>
        <img className='object-cover w-64 md:w-[90%] rounded-lg' src={home} alt="" />
      </div>
    </div>
    </>
  )
}

export default AuthLayout