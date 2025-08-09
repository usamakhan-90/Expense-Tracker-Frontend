import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi"; // Adjust path as needed

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Last 30 Days Expenses Bar Chart";

function ExpenseChart() {
  const { data, isLoading, error } = useGetDashboardQuery();

  // Transform API data into chart format
  const chartData = React.useMemo(() => {
    if (!data?.last30DaysExpense?.transaction) return [];

    // Group by day or week depending on your data structure
    // This example assumes each transaction has a date and amount
    const dailyExpenses = data.last30DaysExpense.transaction.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
      
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {});

    // Convert to array format for Recharts
    return Object.entries(dailyExpenses)
      .map(([date, amount]) => ({ 
        date, 
        amount: Math.abs(amount) // Ensure positive values for chart
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5); // Show last 5 data points as per your example
  }, [data]);

  if (isLoading) {
    return <div className="p-4">Loading expense data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading expense data</div>;
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Last 30 Days Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-gray-500">
            No expense data available for the last 30 days
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 30 Days Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ amount: { label: "Amount", color: "#B95CF4" }}}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(185, 92, 244, 0.1)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded shadow">
                        <p className="font-medium">{payload[0].payload.date}</p>
                        <p className="text-[#B95CF4]">${payload[0].value.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="#B95CF4" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ExpenseChart;