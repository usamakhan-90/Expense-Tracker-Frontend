import React from 'react'
import home from '../../assets/images/home.jpeg'
function AuthLayout({children}) {
  return (
    <>
    <div className='flex'>
        <div>
            <h2>Expense Tracker</h2>
            {
                children
            }
        </div>

        <div>
            <img src={home} alt="" />
        </div>
    </div>
    </>
  )
}

export default AuthLayout