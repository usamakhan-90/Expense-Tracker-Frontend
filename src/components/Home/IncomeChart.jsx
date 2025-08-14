import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Pie, PieChart, Cell, Label, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function IncomeChart() {
  const { data, isLoading, error } = useGetDashboardQuery();
  
  // Process API data for the chart
  const { chartData, totalIncome } = React.useMemo(() => {
    let incomeData = [];
    let total = 0;
    
    if (data?.last60DaysIncome?.transaction) {
      // Group by source and sum amounts
      const incomeBySource = data.last60DaysIncome.transaction.reduce((acc, transaction) => {
        const source = transaction.source || 'Other';
        const amount = Number(transaction.amount) || 0;
        
        if (!acc[source]) {
          acc[source] = 0;
        }
        acc[source] += amount;
        total += amount;
        
        return acc;
      }, {});
      
      // Convert to array format and sort by amount (descending)
      incomeData = Object.entries(incomeBySource)
        .map(([name, value]) => ({
          name,
          value,
          percentage: (value / total * 100).toFixed(0) + '%'
        }))
        .sort((a, b) => b.value - a.value);
    }
    
    return {
      chartData: incomeData,
      totalIncome: total
    };
  }, [data]);

  if (isLoading) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Last 60 Days Income</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 h-[250px] flex items-center justify-center">
          <p>Loading income data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Last 60 Days Income</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 h-[250px] flex items-center justify-center text-red-500">
          <p>Error loading income data</p>
        </CardContent>
      </Card>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Last 60 Days Income</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 h-[250px] flex items-center justify-center text-gray-500">
          <p>No income data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">Last 60 Days Income</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percentage }) => `${name} ${percentage}`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label
                  value={`$${totalIncome.toLocaleString()}`}
                  position="center"
                  className="text-2xl font-bold fill-foreground"
                />
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `$${Number(value).toLocaleString()}`,
                  props.payload.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm pt-0">
        <div className="flex items-center justify-center gap-2 leading-none font-medium">
          {data?.last60DaysIncome?.percentageChange > 0 ? (
            <>
              <span className="text-green-500">
                +{data.last60DaysIncome.percentageChange}%
              </span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : data?.last60DaysIncome?.percentageChange < 0 ? (
            <>
              <span className="text-red-500">
                {data.last60DaysIncome.percentageChange}%
              </span>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          ) : (
           <></>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}