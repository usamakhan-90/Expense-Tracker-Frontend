import React from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import ExpenseList from '../../components/Expense/ExpenseList'

function Expense() {
  return (
    <>
    <DashboardLayout>
      <div className='p-6'>
        <ExpenseOverview/>
      </div>

      <div className='p-6'>
        <ExpenseList/>
      </div>
    </DashboardLayout>
    </>
  )
}

export default Expense