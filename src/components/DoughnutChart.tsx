import React from "react";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProps {
  chartData: any;
  labels: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ chartData, labels }) => {
  return (
    <div className="w-full max-w-2xl h-[500px] p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
      <Doughnut
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" as const },
            title: {
              display: true,
              text: "Average Trip Price per Month",
              font: { size: 18 }, 
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              data: chartData.datasets[0].data,
              backgroundColor: [
                "#ff6384",
                "#36a2eb",
                "#ffce56",
                "#4bc0c0",
                "#9966ff",
                "#ff9f40",
                "#ffcd56",
                "#c9cbcf",
                "#36a2eb",
                "#ff6384",
                "#9966ff",
                "#4bc0c0",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default DoughnutChart;
