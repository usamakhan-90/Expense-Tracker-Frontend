import React from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import InfoCard from '../../components/Home/InfoCard';
import RecentTranscation from '../../components/Home/RecentTranscations';
import FincialChart from '../../components/Home/FincialChart';
import ExpenseCard from '../../components/Home/ExpenseCard';
import ExpenseChart from '../../components/Home/ExpenseChart';
import IncomeChart from '../../components/Home/IncomeChart';
import IncomeCard from '../../components/Home/IncomeCard';
const cardData = [
  {
    id: 10032,
    icon: IoMdCard,
    text: "Total Balance",
    balance: 400,
    iconBg: "bg-purple-500", // Add this
  },
  {
    id: 10034,
    icon: LuWalletMinimal,
    text: "Total Income",
    balance: 200,
    iconBg: "bg-orange-500", // Add this
  },
  {
    id: 10039,
    icon: LuHandCoins,
    text: "Total Expenses",
    balance: 200,
    iconBg: "bg-red-500", // Add this
  },
];

const transactionsData = [
  {
    id: 23232,
    category: "Shopping",
    date: "17th Feb 2025",
    amount: -4300,
    icon: null,
  },
  {
    id: 32323,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 323212,
    category: "Dining",
    date: "5th Mar 2025",
    amount: -8500,
    icon: null,
  },

  {
    id: 323121,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 9032234,
    category: "Dining",
    date: "5th Mar 2025",
    amount: -8500,
    icon: null,
  },

  {
    id: 320176,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 2200128,
    category: "Dining",
    date: "5th Mar 2025",
    amount: -8500,
    icon: null,
  },
];

const expensesData = [
  {
    id: 23232,
    category: "Shopping",
    date: "17th Feb 2025",
    amount: -4300,
    icon: null,
  },
  {
    id: 32323,
    category: "Salary",
    date: "1st Mar 2025",
    amount: -2500,
    icon: null,
  },
  {
    id: 323212,
    category: "Dining",
    date: "5th Mar 2025",
    amount: -8500,
    icon: null,
  },

  {
    id: 323121,
    category: "Salary",
    date: "1st Mar 2025",
    amount: -2500,
    icon: null,
  },
  {
    id: 9032234,
    category: "Dining",
    date: "5th Mar 2025",
    amount: -8500,
    icon: null,
  },

  {
    id: 320176,
    category: "Salary",
    date: "1st Mar 2025",
    amount: -2500,
    icon: null,
  },
  {
    id: 2200128,
    category: "Dining",
    date: "5th Mar 2025",
    amount: -8500,
    icon: null,
  },
];

const incomesData = [
  {
    id: 23232,
    category: "Shopping",
    date: "17th Feb 2025",
    amount: 4300,
    icon: null,
  },
  {
    id: 32323,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 323212,
    category: "Dining",
    date: "5th Mar 2025",
    amount: 8500,
    icon: null,
  },

  {
    id: 323121,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 9032234,
    category: "Dining",
    date: "5th Mar 2025",
    amount: 8500,
    icon: null,
  },

  {
    id: 320176,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 2200128,
    category: "Dining",
    date: "5th Mar 2025",
    amount: 8500,
    icon: null,
  },
];
function Home() {
  return (
    <>
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6'>
         {cardData.map((item) => (
            <InfoCard
              key={item.id}
              title={item.text}
              balance={item.balance}
              icon={item.icon}
              iconBg={item.iconBg}
            />
          ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-6'>
        <RecentTranscation transcations={transactionsData}/>
        <FincialChart/>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-6'>
        <ExpenseCard expenses = {expensesData}/>
        <ExpenseChart/>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-6'>
        <IncomeChart/>
        <IncomeCard incomes={incomesData}/>
      </div>
    </DashboardLayout>
    </>
  )
}

export default Home