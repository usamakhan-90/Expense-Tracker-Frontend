import React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi"; // Adjust path as needed

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with financial data";

function FinancialChart() {
  // Call your dashboard API
  const { data, isLoading, error } = useGetDashboardQuery();
  
  // Transform API data into chart format
  const chartData = React.useMemo(() => {
    if (!data) return [];
    
    return [
      { 
        browser: "balance", 
        visitors: data.totalBalance || 0, 
        fill: "#B95CF4"  // purple
      },
      { 
        browser: "income", 
        visitors: data.totalIncome || 0, 
        fill: "#00FF00"  // green 
      },
      { 
        browser: "expense", 
        visitors: data.totalExpense || 0, 
        fill: "#FF0000"  // red
      },
    ];
  }, [data]);

  const chartConfig = {
    visitors: {
      label: "Balance",
    },
    chrome: {
      label: "Income",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Expense",
      color: "var(--chart-2)",
    },
  };

  const balance = React.useMemo(() => {
    return chartData.find((item) => item.browser === "balance")?.visitors || 0;
  }, [chartData]);

  if (isLoading) {
    return <div className="p-4">Loading financial data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading financial data</div>;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={75}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${balance.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground"
                        >
                          Total Balance
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="hidden md:flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-purple-500 size-2 rounded-full">

            </div>

            <div>
              Total Balance
            </div>
          </div>

           <div className="flex justify-center items-center gap-2">
            <div className="bg-green-500 size-2 rounded-full">

            </div>

            <div>
              Total Income
            </div>
          </div>

           <div className="flex justify-center items-center gap-2">
            <div className="bg-red-500 size-2 rounded-full">

            </div>

            <div className="">
              Total Expense
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default FinancialChart;