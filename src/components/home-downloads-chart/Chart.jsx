import React from "react";
import "./chart.css";
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

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Android OS",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    // y: {
    //   type: "linear",
    //   display: true,
    //   position: "left",
    // },
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Android",
      data: [123, 456, 23445, 5595, 121, 3445],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
};

const Chart = () => {
  return (
    <div className="chartContainer">
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
