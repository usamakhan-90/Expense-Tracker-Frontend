import React from "react";
import { FiDownload } from "react-icons/fi";
import IncomeInfo from "./IncomeInfo";
import { useDownloadIncomeExcelMutation, useGetAllIncomeQuery } from "../../features/income/incomeApi";



function IncomeList() {

  const {data} = useGetAllIncomeQuery();

  const [downloadIncomeExcel] = useDownloadIncomeExcelMutation();

  const incomeData = Array.isArray(data?.incomes) ? data.incomes : [];

  const handleDownload = async () =>{
    try {
      const response = await downloadIncomeExcel().unwrap();

      const url = window.URL.createObjectURL(response);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'income.xlsx';
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
            <h1 className="text-lg font-semibold">Income Source</h1>
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
            {incomeData.map((item) => (
              <IncomeInfo  key={item._id || item.id}
                source = {item.source}
                icon = {item.icon}
                date = {item.date}
                amount = {item.amount}
                show={true}/>
            ))}
          </div>
        </div>
    </>
  );
}

export default IncomeList;
