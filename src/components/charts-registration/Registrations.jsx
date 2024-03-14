import React from "react";
import "./registrations.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Registrations = () => {
  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Users",
        data: [102, 129, 300, 545, 672, 839, 467, 400, 500, 535, 578, 140],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "magenta",
          "rgb(54, 162, 235)",
          "#808080",
          "rgb(255, 205, 86)",
          "rgb(255, 25, 86)",
          "aqua",
          "orange",
          "#ff0000",
          "#0096FF",
          "#31e312",
          "#e6c41e",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="registrationsChartContainer">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  weight: "lighter",
                },
              },
              position: "right",
              title: {
                display: true,
                text: "User Registrations",
                font: {
                  size: 14,
                  weight: "bolder",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Registrations;
