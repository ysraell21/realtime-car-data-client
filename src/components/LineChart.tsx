import React from "react";
import { Line } from "react-chartjs-2";

interface LineChartProps {
  selectedMetric?: string;
  chartData: any;
}

const LineChart: React.FC<LineChartProps> = ({ selectedMetric, chartData }) => {
  return (
    <div className="w-full max-w-4xl h-[500px] p-6 bg-white rounded-lg shadow-md">
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" as const },
            title: {
              display: true,
              text:
                selectedMetric === "trips"
                  ? "Total Trips per Month"
                  : "Total Revenue per Month",
              font: { size: 18 },
            },
          },
        }}
        data={chartData}
      />
    </div>
  );
};

export default LineChart;
