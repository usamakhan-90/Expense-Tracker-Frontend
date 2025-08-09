import React from "react";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteAlert from "../CommonComponent/DeleteAlert";
function IncomeInfo({ source, icon, date, amount, show, onDelete }) {
  const formatData = (dateString) => {
    const options = { day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-Us", options);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
          <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
              <span>{source?.charAt(0)}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <h2 className="text-base font-normal text-[#333333]">{source}</h2>
            <p className="text-slate-600 text-xs">{date ? formatData(date) : "No Date"}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {show && (
            <DeleteAlert
              onConfirm={handleDelete}
              title={`Delete ${category}`}
              description={`Are you sure you want to delete this ${source} income record`}
            >
              <button>
                <RiDeleteBinLine className="size-6 cursor-pointer" />
              </button>
            </DeleteAlert>
          )}

          <button
            className={`flex justify-center items-center gap-2 cursor-pointer text-green-600`}
          >
            +${Math.abs(amount)}
            <HiMiniArrowTrendingUp />
          </button>
        </div>
      </div>
    </>
  );
}

export default IncomeInfo;
