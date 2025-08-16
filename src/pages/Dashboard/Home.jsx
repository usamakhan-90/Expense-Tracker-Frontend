import React, { useEffect } from "react";
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

function Home() {

  const {data, refetch} = useGetDashboardQuery();

  useEffect(()=>{
    refetch();
  }, refetch)
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
          <IncomeCard />
        </div>
      </DashboardLayout>
    </>
  );
}

export default Home;
