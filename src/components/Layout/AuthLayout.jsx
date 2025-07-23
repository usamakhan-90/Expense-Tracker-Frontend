import React from 'react'
import home from '../../assets/images/home.jpeg'
function AuthLayout({children}) {
  return (
    <>
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] pt-8 pb-12 px-12'>
            <h2 className='text-lg font-medium'>Expense Tracker</h2>
            {
                children
            }
        </div>

        <div className='w-[40vw] hidden md:flex justify-center items-center bg-violet-200'>
            <img className='w-64 lg:w-[90%]' src={home} alt="" />
        </div>
    </div>
    </>
  )
}

export default AuthLayout