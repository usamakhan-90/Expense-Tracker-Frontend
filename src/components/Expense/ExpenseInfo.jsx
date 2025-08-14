import React from "react";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteAlert from "../CommonComponent/DeleteAlert";
import { useDeleteExpenseMutation } from "../../features/expense/expenseApi";
function ExpenseInfo({ icon, category, date, amount, show, id }) {

   const formatData = (dateString) => {
    const options = { day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-Us", options);
  };

  const [deleteExpense] = useDeleteExpenseMutation();
  const handleDelete = async () => {
    try {
      await deleteExpense(id).unwrap();
      console.log("Expense delete successfully")
    } catch (error) {
      console.log("Error in delete Api", error)
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
          <div className="size-10 bg-gray-200 rounded-full flex justify-center items-center">
            <span>{category.charAt(0)}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <h2 className="text-base font-normal text-[#333333]">{category}</h2>
            <p className="text-slate-600 text-xs">{date ? formatData(date) : "No Date"}</p>
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
            className={`text-red-600 flex justify-center items-center gap-2 cursor-pointer font-semibold`}
          >
            -{Math.abs(amount)}
            <HiMiniArrowTrendingDown className="size-5" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ExpenseInfo;
