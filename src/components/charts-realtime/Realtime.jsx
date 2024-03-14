import React from "react";
import "./realtime.css";
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

const Realtime = () => {
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
        text: "Server Activity Monitoring",
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
      //     position: "right",
      //     grid: {
      //       display: false,
      //     },
      //   },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          display: false,
          drawOnChartArea: true,
        },
      },
    },
  };

  const labels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    // "CPU Usage",
    // "Requests per second",
    // "Mean Response time",
    // "Server-side processing time",
    // "Error rates",
    // "Memory usage",
    // "Disk usage",
    // "Network throughput",
    // "Latency",
    // "Page Load Time",
    // "Time To First Byte(TTFB)",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "CPU Usage - (KB per vCPU)",
        tension: 0.3,
        data: [123, 456, 875, 345, 190, 567, 869, 450, 500, 650, 300, 1000],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Requests Per Second",
        tension: 0.3,
        data: [12, 46, 85, 45, 90, 56, 86, 57, 50, 65, 30, 100],
        borderColor: "rgb(56, 234, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Average Response Time",
        tension: 0.3,
        data: [12, 22, 32, 42, 52, 62, 72, 10, 15, 25, 38, 47],
        borderColor: "rgb(233, 12, 245)",
        backgroundColor: "rgba(233, 12, 245, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Server-side Processing Time - per second",
        tension: 0.3,
        data: [42, 32, 22, 52, 62, 82, 72, 98, 20, 34, 51, 9],
        borderColor: "rgb(227, 29, 11)",
        backgroundColor: "rgba(227, 29, 11, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Memory Usage (MB per vCPU)",
        tension: 0.3,
        data: [424, 322, 252, 502, 652, 832, 672, 198, 200, 324, 851, 409],
        borderColor: "rgb(49, 227, 18)",
        backgroundColor: "rgba(49, 227, 18, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Disk Usage (MB)",
        tension: 0.3,
        data: [420, 145, 178, 450, 356, 984, 256, 734, 206, 567, 295, 390],
        borderColor: "rgb(230, 196, 30)",
        backgroundColor: "rgba(230, 196, 30, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  return (
    <div className="realtimeChartContainer">
      <Line options={options} data={data} height={"100%"} />
    </div>
  );
};

export default Realtime;
