import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import IncomeInfo from '../Income/IncomeInfo';
import { useNavigate } from 'react-router-dom';
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
function IncomeCard() {
  const navigate = useNavigate();
  return (
   <>
     <div className="bg-white shadow-lg border border-gray-50 outline-none p-4 rounded-md">
               <div className="flex justify-between items-center">
                 <h2 className="text-lg font-normal">Income</h2>
                 <button 
                 onClick={()=>navigate("/income")}
                 className="flex justify-center items-center gap-2 bg-violet-400 px-6 py-2 max-sm:px-4 max-sm:py-1 rounded text-white hover:bg-violet-600 cursor-pointer">
                   See All <BsArrowRight />
                 </button>
               </div>
       
               {incomesData.slice(0, 5).map((item) => (
                <IncomeInfo 
                key={item.id}
                category = {item.category}
                icon = {item.icon}
                date = {item.date}
                amount = {item.amount}
                />
               ))}
             </div>
   </>
  )
}

export default IncomeCard