import React from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import IncomeList from '../../components/Income/IncomeList'

function Income() {
  return (
    <>
    <DashboardLayout>
      <div className='p-6'>
        <IncomeOverview/>
      </div>

      <div className='p-6'>
        <IncomeList/>
      </div>
    </DashboardLayout>
    </>
  )
}

export default Income