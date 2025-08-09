import React from 'react'

function InfoCard({title, value, icon, iconBg}) {
  return (
    <>
     <div className='bg-white p-4 border shadow-lg rounded-lg flex gap-4'>
        <div className={`size-12 ${iconBg} rounded-full flex justify-center items-center`}>
          <div className='text-2xl text-white'>
            {icon}
          </div>
            
        </div>

        <div className='flex flex-col gap-1'>
            <h3 className='text-base text-slate-500 font-medium'>{title}</h3>
            <p className='text-lg font-bold'>${value}</p>
        </div>
    </div>
    </>
  )
}

export default InfoCard