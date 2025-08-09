import React from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  HiMiniArrowTrendingUp,
  HiMiniArrowTrendingDown,
} from "react-icons/hi2";
function RecentTranscation({ transcations = [] }) {
  return (
    <>
      <div className="bg-white shadow-lg border border-gray-50 outline-none p-4 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-normal">Recent Transactions</h2>
          <button className="flex justify-center items-center gap-2 bg-violet-400 px-6 py-2 max-sm:px-4 max-sm:py-1 rounded text-white hover:bg-violet-600 cursor-pointer">
            See All <BsArrowRight />
          </button>
        </div>

        {transcations.slice(0, 6).map((item) => (
          <div key={item.id} className="flex justify-between items-center mt-3">
            <div className="flex gap-2">
              <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
                {
                    item.icon ? <img src={item.icon} alt={item.category} /> : <span>{item.category.charAt(0)}</span>
                }
              </div>

              <div className="flex flex-col space-y-1">
                <h2 className="text-base font-normal text-[#333333]">
                  {
                    item.category
                  }
                </h2>
                <p className="text-slate-600 text-xs">{item.date}</p>
              </div>
            </div>

            <div>
              <button className={`px-5 py-1.5  rounded border flex justify-center items-center gap-2 text-white max-sm:px-3 max-sm:py-0.5 cursor-pointer ${item.amount > 0 ? 'bg-green-400 hover:bg-green-600 ' : 'bg-red-500 hover:bg-red-700'}`}>
                {
                    item.amount > 0 ? '+' : '-'
                }
                
                ${Math.abs(item.amount)}
                {
                    item.amount > 0 ? <HiMiniArrowTrendingUp/> : <HiMiniArrowTrendingDown />
                }
                
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RecentTranscation;
