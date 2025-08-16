import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useState, useMemo } from "react";

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
import { useGetAllIncomeQuery } from "../../features/income/incomeApi";

export const description = "A bar chart showing daily income";

const chartConfig = {
  income: {
    label: "Income",
    color: "#B95CF4",
  },
};

function IncomeOverview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Get data from RTK Query
  const { data: incomeData, refetch, isLoading, error } = useGetAllIncomeQuery();
  
  // Transform data for daily chart display
  const chartData = useMemo(() => {
    console.log("Processing income data:", incomeData);
    
    if (!incomeData) {
      console.log("No income data available");
      return [];
    }
    
    // Handle different data structures
    let dataArray = incomeData;
    
    // If data is wrapped in an object, extract the array
    if (incomeData.data && Array.isArray(incomeData.data)) {
      dataArray = incomeData.data;
    } else if (incomeData.incomes && Array.isArray(incomeData.incomes)) {
      dataArray = incomeData.incomes;
    } else if (!Array.isArray(incomeData)) {
      console.log("Data is not an array:", typeof incomeData);
      return [];
    }
    
    console.log("Data array to process:", dataArray);
    
    // Group income by date
    const dailyIncome = dataArray.reduce((acc, income) => {
      console.log("Processing income item:", income);
      
      // Try different possible date field names
      const dateField = income.date || income.createdAt || income.created_at || income.dateCreated;
      const amountField = income.amount || income.value || income.total || income.price;
      
      if (!dateField) {
        console.log("No date field found in:", income);
        return acc;
      }
      
      const date = new Date(dateField).toLocaleDateString();
      const amount = parseFloat(amountField || 0);
      
      if (acc[date]) {
        acc[date] += amount;
      } else {
        acc[date] = amount;
      }
      
      return acc;
    }, {});
    
    console.log("Daily income grouped:", dailyIncome);
    
    // Convert to array format for recharts
    const result = Object.entries(dailyIncome)
      .map(([date, amount]) => ({
        date: date,
        income: amount,
        // Format date for better display (optional)
        displayDate: new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
      .slice(-30); // Show last 30 days only (adjust as needed)
    
    console.log("Final chart data:", result);
    return result;
  }, [incomeData]);

  const handleIncomeAdded = () => {
    setIsDialogOpen(false);
    refetch(); // Refresh data after adding new income
  };

  // Render the header section (same for both cases)
  const renderHeader = () => (
    <CardHeader>
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-semibold">Income Overview</h1>
          <p className="text-sm text-slate-500">
            Track your daily earnings over time and analyze your income trends
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
  );

  // Loading state
  if (isLoading) {
    return (
      <>
        <Card>
          <CardContent className="flex items-center justify-center h-[400px]">
            <p>Loading income data...</p>
          </CardContent>
        </Card>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <AddIncomeForm onClose={handleIncomeAdded} />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Error state
  if (error) {
    console.error("RTK Query Error:", error);
    return (
      <>
        <Card>
          <CardContent className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <p className="text-red-500">Error loading income data</p>
              <p className="text-sm text-gray-500 mt-2">Check console for details</p>
              <button 
                onClick={() => refetch()} 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </CardContent>
        </Card>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <AddIncomeForm onClose={handleIncomeAdded} />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // No data state
  if (!chartData || chartData.length === 0) {
    return (
      <>
        <Card>
          {renderHeader()}
          <CardContent className="flex items-center justify-center h-[300px]">
            <div className="text-center">
              <p className="text-gray-500">No income data available</p>
              <p className="text-sm text-gray-400 mt-2">Add some income entries to see the chart</p>
            </div>
          </CardContent>
        </Card>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <AddIncomeForm onClose={handleIncomeAdded} />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Main component with data
  return (
    <>
      <Card>
        {renderHeader()}
        <CardContent>
          <ChartContainer className="lg:h-[300px] h-full w-full" config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="displayDate"
                tickLine={false}
                tickMargin={4}
                axisLine={false}
                interval="preserveStartEnd"
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                  hideLabel={false}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return `Date: ${payload[0].payload.date}`;
                    }
                    return label;
                  }}
                  formatter={(value, name) => [`$${value.toFixed(2)}`, "Income"]}
                />}
              />
              <Bar 
                dataKey="income" 
                fill="var(--color-income)" 
                radius={8} 
                barSize={80} 
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <AddIncomeForm onClose={handleIncomeAdded} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default IncomeOverview;