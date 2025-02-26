import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import { faker } from "@faker-js/faker";
import toast from "react-hot-toast";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Home: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<
    "trips" | "revenue" | "avgPrice"
  >("trips");
  const [chartData, setChartData] = useState<any>(null);
  const [averageTripPrice, setAverageTripPrice] = useState<any>(null);

  const fetchDataAverageTripPrice = async () => {
    try {
      const response = await axios.get("/average-trip-price-per-month");
      setAverageTripPrice(response.data);
    } catch (error) {
      toast.error("Failed to fetch data [ Average Trip Price ]");
    }
  }

  useEffect(() => {
    fetchDataAverageTripPrice();
  }, []);

  useEffect(() => {
    let dataValues;

    if (selectedMetric === "trips") {
      dataValues = labels.map(() => faker.number.int({ min: 500, max: 5000 }));
    } else if (selectedMetric === "revenue") {
      dataValues = labels.map(() =>
        faker.number.int({ min: 50000, max: 500000 })
      );
    } else {
      const filteredAverage = labels.map((_, index) => {
        const data = averageTripPrice.find((item: Record<string, any>) => item.month === index + 1);
        return data ? data.avgTripPrice : 0;
      });
      dataValues = filteredAverage
    }

    setChartData({
      labels,
      datasets: [
        {
          fill: true,
          label:
            selectedMetric === "trips"
              ? "Total Trips per Month"
              : selectedMetric === "revenue"
              ? "Total Revenue per Month"
              : "Average Trip Price per Month",
          data: dataValues,
          borderColor:
            selectedMetric === "trips"
              ? "rgb(53, 162, 235)"
              : "rgb(255, 99, 132)",
          backgroundColor:
            selectedMetric === "trips"
              ? "rgba(53, 162, 235, 0.5)"
              : "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, [selectedMetric]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Trips & Revenue Overview
        </h2>

        <div className="mb-4">
          <label className="mr-2 font-medium">Select Metric:</label>
          <select
            value={selectedMetric}
            onChange={(e) =>
              setSelectedMetric(
                e.target.value as "trips" | "revenue" | "avgPrice"
              )
            }
            className="p-2 border rounded-md bg-white shadow-sm"
          >
            <option value="trips">Total Trips per Month</option>
            <option value="revenue">Total Revenue per Month</option>
            <option value="avgPrice">Average Trip Price per Month</option>
          </select>
        </div>

        <div className="w-full flex justify-center">
          {chartData &&
            (selectedMetric === "avgPrice" ? (
              <DoughnutChart chartData={chartData} labels={labels} />
            ) : (
              <LineChart
                selectedMetric={selectedMetric}
                chartData={chartData}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
