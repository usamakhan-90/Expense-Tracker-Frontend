import React, { useState, useEffect, useMemo } from "react";
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

  // Extract expenses array safely
  const expenses = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return data?.expenses || [];
  }, [data]);

  // Convert for chart
  const chartData = useMemo(() => {
    return expenses.map(expense => {
      try {
        return {
          date: format(parseISO(expense.date), "MMM dd"),
          amount: Math.abs(expense.amount)
        };
      } catch {
        return null;
      }
    }).filter(Boolean)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [expenses]);

  // Refetch when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      refetch();
    }
  }, [isDialogOpen, refetch]);

  // ---- UI states ----
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

  // Updated error condition - only show error if there's an error AND no data at all
  if (isError && !data) {
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
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center">
              <p className="text-lg font-semibold">Welcome to the Expense Tracker!</p>
              <p className="text-sm">Add your first expense to get started.</p>
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