import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddExpenseForm from "../Expense/AddExpenseForm";
export const description = "A line chart with dots";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#B95CF4",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
};
function ExpenseOverview() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg font-semibold">Expense Overview</h1>
              <p className="text-sm text-slate-500">
                Track your spending tends over time and gain insights into where
                your money goes.
              </p>
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-violet-200 text-violet-600 px-6 py-2.5 rounded-lg font-normal text-lg cursor-pointer hover:bg-violet-400 hover:text-white"
              >
                + Add Expense
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="lg:h-[300px] h-full w-full"
            config={chartConfig}
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <AddExpenseForm onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ExpenseOverview