import React, { useState } from "react";
import { useGetAllIncomeQuery } from "../../features/income/incomeApi";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import AddIncomeForm from "../Income/AddIncomeForm";

function IncomeOverview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: incomeData, isLoading, isError } = useGetAllIncomeQuery();

  // Debugging logs
  console.log("Raw API data:", incomeData);

  // Safely extract income array
  const incomeArray = React.useMemo(() => {
    if (!incomeData) return [];
    return Array.isArray(incomeData) ? incomeData : incomeData.data || [];
  }, [incomeData]);

  console.log("Income array:", incomeArray);

  // Group and format data
  const groupedData = React.useMemo(() => {
    if (!incomeArray.length) return [];

    const grouped = incomeArray?.incomes.reduce((acc, curr) => {
      try {
        const formattedDate = format(new Date(curr.date), "MMM dd");
        if (!acc[formattedDate]) {
          acc[formattedDate] = { date: formattedDate, income: 0 };
        }
        acc[formattedDate].income += Number(curr.amount) || 0;
        return acc;
      } catch (error) {
        console.error("Error processing income entry:", curr, error);
        return acc;
      }
    }, {});

    const result = Object.values(grouped);
    console.log("Grouped chart data:", result);
    return result;
  }, [incomeArray]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-lg font-semibold">Income Overview</h1>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p>Loading income data...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-lg font-semibold">Income Overview</h1>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-red-500">
          <p>Error loading income data</p>
        </CardContent>
      </Card>
    );
  }

  if (!groupedData.length) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-lg font-semibold">Income Overview</h1>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-gray-500">
          <p>No income data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg font-semibold">Income Overview</h1>
              <p className="text-sm text-slate-500">
                Track your earnings over time
              </p>
            </div>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-violet-200 text-violet-600 px-6 py-2.5 rounded-lg font-normal text-lg cursor-pointer hover:bg-violet-400 hover:text-white"
            >
              + Add Income
            </button>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={groupedData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p className="font-medium">{payload[0].payload.date}</p>
                        <p className="text-[#B95CF4]">
                          ${payload[0].value.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="income"
                fill="#B95CF4"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <AddIncomeForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default IncomeOverview;