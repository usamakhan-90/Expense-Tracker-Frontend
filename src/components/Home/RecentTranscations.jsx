import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";
import {
  HiMiniArrowTrendingUp,
  HiMiniArrowTrendingDown,
} from "react-icons/hi2";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi"; 
function RecentTranscation() {
  const { data, isLoading, isError } = useGetDashboardQuery();

  const recentTranscation = data?.recentTranscations || [];

  const formatData = (dateString) => {
    const options = { day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-Us", options);
  };

  if(isLoading)
  {
    return (
      <LuLoader className="flex justify-center items-center transition-all duration-300 rotate-[360]" size={20}/>
    )
    
  }
  return (
    <>
      <div className="bg-white shadow-md border border-gray-200 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Transactions
          </h2>
        </div>

        {recentTranscation?.slice(0, 6)?.map((item) => {
          const isIncome = item.type === "income";
          const amountText = isIncome
            ? `+${item.amount.toLocaleString()}`
            : `-${item.amount.toLocaleString()}`;
          return (
            <div
              key={item.id || item._id}
              className="flex justify-between items-center mt-3"
            >
              <div className="flex gap-2">
                <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
                  {
                    <span className={`${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                      {item.source?.charAt(0).toUpperCase() ||
                        item.category?.charAt(0).toUpperCase()}
                    </span>
                  }
                </div>

                <div className="flex flex-col space-y-1">
                  <h2 className="text-base font-normal text-[#333333]">
                    {item.source || item.category}
                  </h2>
                  <p className="text-slate-600 text-xs">
                    {item.date ? formatData(item.date) : "No Date"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  isIncome ? "text-green-600" : "text-red-600"
                }`}
              >
                <span className="font-medium">{amountText}</span>
                {isIncome ? (
                  <HiMiniArrowTrendingUp className="w-5 h-5" />
                ) : (
                  <HiMiniArrowTrendingDown className="w-5 h-5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RecentTranscation;
