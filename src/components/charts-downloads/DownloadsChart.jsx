import React from "react";
import "./downloads.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DownloadsChart = () => {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "App Downloads - Android OS",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      //   y: {
      //     type: "linear",
      //     display: true,
      //     position: "left",
      //     grid: {
      //       display: false,
      //       drawOnChartArea: false,
      //     },
      //   },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          drawOnChartArea: false,
        },
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
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Android",
        tension: 0.3,
        data: [123, 456, 875, 345, 190, 567, 869, 450, 500, 650, 300, 1000],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  return (
    <div className="downloadsChartContainer">
      <Line options={options} data={data} />
    </div>
  );
};

export default DownloadsChart;
