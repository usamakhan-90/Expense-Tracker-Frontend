import React from 'react'

function InfoCard({title, balance, icon:Icon, iconBg}) {
  return (
    <>
     <div className='bg-white p-4 border shadow-lg rounded-lg flex gap-4'>
        <div className={`size-12 ${iconBg} rounded-full flex justify-center items-center`}>
            <Icon className='text-white text-lg'/>
        </div>

        <div className='flex flex-col gap-1'>
            <h3 className='text-base text-slate-500 font-medium'>{title}</h3>
            <p className='text-lg font-bold'>${balance}</p>
        </div>
    </div>
    </>
  )
}

export default InfoCard