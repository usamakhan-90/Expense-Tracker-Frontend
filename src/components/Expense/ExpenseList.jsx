import React from "react";
import ExpenseInfo from "./ExpenseInfo";
import { FiDownload } from "react-icons/fi";
import { useDownloadExpenseExcelMutation, useGetAllExpenseQuery } from "../../features/expense/expenseApi";

function ExpenseList() {

  const { data} = useGetAllExpenseQuery();

  const [downloadExpenseExcel] = useDownloadExpenseExcelMutation();

  const expenseData = Array.isArray(data?.expenses) ? data.expenses : [];

  console.log(expenseData);

  const handleDownload = async () =>{
    try {
      const response = await downloadExpenseExcel().unwrap();

      const url = window.URL.createObjectURL(response);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'expense.xlsx';
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.log("Error downloading file:", error)
    }
  }
  return (
    <>
      <div className="border shadow-lg p-4  rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">All Expenses</h1>
          </div>

          <div className="">
            <button 
            onClick={handleDownload}
             className="flex justify-center items-center gap-2 px-4 py-2 bg-purple-400 text-white rounded cursor-pointer hover:bg-purple-600">
              <FiDownload /> Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {expenseData.map((item) => (
            <ExpenseInfo
              key={item.id || item._id}
              id = {item._id}
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
