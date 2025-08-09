import React from "react";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteAlert from "../CommonComponent/DeleteAlert";
function ExpenseInfo({ icon, category, date, amount, show }) {
    const handleDelete = () =>{
        if(onDelete)
        {
            onDelete();
        }
    }
  return (
    <>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
          <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
            {icon ? (
              <img src={icon} alt={category} />
            ) : (
              <span>{category.charAt(0)}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <h2 className="text-base font-normal text-[#333333]">{category}</h2>
            <p className="text-slate-600 text-xs">{date}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {show && (
            <DeleteAlert
              onConfirm={handleDelete}
              title={`Delete ${category}`}
              description={`Are you sure you want to delete this ${category} category record?`}
            >
              <button>
                <RiDeleteBinLine className="size-6 cursor-pointer" />
              </button>
            </DeleteAlert>
          )}
          <button
            className={`px-5 py-1.5  rounded border flex justify-center items-center gap-2 text-white max-sm:px-3 max-sm:py-0.5 cursor-pointer bg-red-500 hover:bg-red-700`}
          >
            -${Math.abs(amount)}
            <HiMiniArrowTrendingDown />
          </button>
        </div>
      </div>
    </>
  );
}

export default ExpenseInfo;
