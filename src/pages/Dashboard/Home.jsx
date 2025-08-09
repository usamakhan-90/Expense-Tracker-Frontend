import React from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/Home/InfoCard";
import RecentTranscation from "../../components/Home/RecentTranscations";
import FincialChart from "../../components/Home/FincialChart";
import ExpenseCard from "../../components/Home/ExpenseCard";
import ExpenseChart from "../../components/Home/ExpenseChart";
import IncomeChart from "../../components/Home/IncomeChart";
import IncomeCard from "../../components/Home/IncomeCard";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";



const incomesData = [
  {
    id: 23232,
    category: "Shopping",
    date: "17th Feb 2025",
    amount: 4300,
    icon: null,
  },
  {
    id: 32323,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 323212,
    category: "Dining",
    date: "5th Mar 2025",
    amount: 8500,
    icon: null,
  },

  {
    id: 323121,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 9032234,
    category: "Dining",
    date: "5th Mar 2025",
    amount: 8500,
    icon: null,
  },

  {
    id: 320176,
    category: "Salary",
    date: "1st Mar 2025",
    amount: 2500,
    icon: null,
  },
  {
    id: 2200128,
    category: "Dining",
    date: "5th Mar 2025",
    amount: 8500,
    icon: null,
  },
];
function Home() {

  const {data} = useGetDashboardQuery();
  console.log(data)
  return (
    <>
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          <InfoCard
            title="Total Balance"
            value={data?.totalBalance || 0}
            icon={<IoMdCard />}
            iconBg="bg-purple-500"
          />

          <InfoCard
            title="Total Income"
            value={data?.totalIncome || 0}
            icon={<LuWalletMinimal />}
            iconBg="bg-orange-500"
          />

          <InfoCard
            title="Total Expense"
            value={data?.totalExpense || 0}
            icon={<LuHandCoins />}
            iconBg="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
          <RecentTranscation />
          <FincialChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
          <ExpenseCard />
          <ExpenseChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
          <IncomeChart />
          <IncomeCard incomes={incomesData} />
        </div>
      </DashboardLayout>
    </>
  );
}

export default Home;
