import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
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
import AddIncomeForm from "../Income/AddIncomeForm";

export const description = "A bar chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#B95CF4",
  },
};

function IncomeOverview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <h1 className="text-lg font-semibold">Income Overview</h1>
              <p className="text-sm text-slate-500">
                Track your earnings over time and analyze your income trends
              </p>
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-violet-200 text-violet-600 px-6 py-2.5 rounded-lg font-normal text-lg cursor-pointer hover:bg-violet-400 hover:text-white"
              >
                + Add Income
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer className="lg:h-[300px] h-full w-full" config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={4}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} barSize={80} />
            </BarChart>
          </ChartContainer>
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
