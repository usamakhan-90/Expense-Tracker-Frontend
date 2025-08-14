import React, { useState, useEffect } from "react";
import { useGetAllExpenseQuery } from "../../features/expense/expenseApi";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddExpenseForm from "../Expense/AddExpenseForm";

function ExpenseOverview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useGetAllExpenseQuery();

  // Debugging logs
  console.log("Raw API data:", data);
  
  // Transform API data to show daily expenses
  const chartData = React.useMemo(() => {
    if (!data) return [];
    
    // Check if data is an array (direct response) or has expenses property
    const expenses = Array.isArray(data) ? data : data.expenses || data.dailyExpenses || [];
    
    console.log("Expenses data:", expenses);

    // Process and format the data
    const processedData = expenses.map(expense => {
      try {
        return {
          date: format(parseISO(expense.date), 'MMM dd'),
          amount: Math.abs(expense.amount)
        };
      } catch (error) {
        console.error("Error processing expense:", expense, error);
        return null;
      }
    }).filter(item => item !== null) // Remove any failed conversions
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort chronologically

    console.log("Processed chart data:", processedData);
    return processedData;
  }, [data]);

  // Refetch data when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      refetch();
    }
  }, [isDialogOpen, refetch]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-lg font-semibold">Expense Overview</h1>
          <p className="text-sm text-slate-500">Loading expenses...</p>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div>Loading chart data...</div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-lg font-semibold">Expense Overview</h1>
          <p className="text-sm text-red-500">Error loading expense data</p>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-red-500">Failed to load expense data</div>
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
              <h1 className="text-lg font-semibold">Daily Expenses</h1>
              <p className="text-sm text-slate-500">
                Track your daily spending patterns
              </p>
            </div>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-violet-200 text-violet-600 px-6 py-2.5 rounded-lg font-normal text-lg cursor-pointer hover:bg-violet-400 hover:text-white"
            >
              + Add Expense
            </button>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
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
                        <div className="bg-white p-3 border rounded shadow">
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
                <Line
                  dataKey="amount"
                  type="monotone"
                  stroke="#B95CF4"
                  strokeWidth={2}
                  dot={{
                    fill: "#B95CF4",
                    strokeWidth: 2,
                    r: 4
                  }}
                  activeDot={{
                    r: 6,
                    stroke: "#B95CF4",
                    strokeWidth: 2,
                    fill: "#fff"
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              {data ? "No expense data available" : "Failed to load data"}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <AddExpenseForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExpenseOverview;