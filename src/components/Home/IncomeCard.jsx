import React from "react";
import { BsArrowRight } from "react-icons/bs";
import IncomeInfo from "../Income/IncomeInfo";
import { useNavigate } from "react-router-dom";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";
function IncomeCard() {
  const { data } = useGetDashboardQuery();

  const incomes = data?.last60DaysIncome?.transaction || [];



  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white shadow-md border border-gray-200 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-normal">Income</h2>
          <button
            onClick={() => navigate("/income")}
            className="flex justify-center items-center gap-2 bg-violet-400 px-6 py-2 max-sm:px-4 max-sm:py-1 rounded text-white hover:bg-violet-600 cursor-pointer"
          >
            See All <BsArrowRight />
          </button>
        </div>

        {incomes.slice(0, 6).map((item) => (
          <IncomeInfo
            key={item.id || item._id}
            source={item.source}
            icon={item.icon}
            date={item.date}
            amount={item.amount}
          />
        ))}
      </div>
    </>
  );
}

export default IncomeCard;
