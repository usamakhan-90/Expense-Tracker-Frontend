import React from "react";
import ExpenseInfo from "./ExpenseInfo";
import { FiDownload } from "react-icons/fi";

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
function ExpenseList() {
  return (
    <>
      <div className="border shadow-lg p-4  rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">All Expenses</h1>
          </div>

          <div className="">
            <button className="flex justify-center items-center gap-2 px-4 py-2 bg-purple-400 text-white rounded cursor-pointer hover:bg-purple-600">
              <FiDownload /> Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {expensesData.map((item) => (
            <ExpenseInfo
              key={item.id}
              category={item.category}
              date={item.date}
              amount={item.amount}
              icon={item.icon}
              show={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ExpenseList;
