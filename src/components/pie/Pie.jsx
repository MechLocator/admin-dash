import React from "react";
import "./pie.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March", "April", "March", "June"],
  datasets: [
    {
      label: "Users",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(233, 11, 241, 0.8)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(46, 39, 46, 0.8)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(15, 203, 205, 0.8)",
        "rgba(205, 115, 15, 0.8)",
      ],
      borderColor: [
        "rgba(233, 11, 241, 0.8)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(46, 39, 46, 0.8)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(15, 203, 205, 0.8)",
        "rgba(205, 115, 15, 0.8)",
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  return (
    <div className="pieContainer">
      <h4 className="pieChartHeader">User Registration in the past 6 months</h4>
      <div className="pieChartContainer">
        <Pie
          data={data}
          options={{
            plugins: { legend: { display: true, position: "top" } },
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
