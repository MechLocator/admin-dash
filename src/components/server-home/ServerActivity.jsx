import React from "react";
import "./server.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const ServerActivity = () => {
  ChartJS.register(
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Downloads Per Platform",
      },
      Legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Motorists",
        data: [20, 30, 40, 50, 60, 70, 80],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Garages",
        data: [5, 10, 15, 20, 25, 30, 35],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <div className="chartConatiner">
      <Bar options={options} data={data} />
    </div>
  );
};

export default ServerActivity;
