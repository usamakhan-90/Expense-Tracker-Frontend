import React from "react";
import { BsArrowRight } from "react-icons/bs";

import ExpenseInfo from "../Expense/ExpenseInfo";
import { useNavigate } from "react-router-dom";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";
function ExpenseCard() {
  const { data } = useGetDashboardQuery();

  const expenses = data?.last30DaysExpense?.transaction || [];

  console.log(expenses);
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white shadow-lg border border-gray-50 outline-none p-4 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-normal">Expenses</h2>
          <button
            onClick={() => navigate("/expense")}
            className="flex justify-center items-center gap-2 bg-violet-400 px-6 py-2 max-sm:px-4 max-sm:py-1 rounded text-white hover:bg-violet-600 cursor-pointer"
          >
            See All <BsArrowRight />
          </button>
        </div>

        {expenses.slice(0, 5).map((item) => (
          <ExpenseInfo
            key={item.id}
            category={item.category}
            date={item.date}
            amount={item.amount}
            icon={item.icon}
          />
        ))}
      </div>
    </>
  );
}

export default ExpenseCard;
