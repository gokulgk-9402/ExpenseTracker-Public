"use client";

import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type CategoryWithAmount = {
  title: string;
  id: string;
  color: string;
  amount: number;
};
type Props = {
  data: CategoryWithAmount[];
};

const WeekDoughnutChart: React.FC<Props> = ({ data = [] }) => {
  const d = {
    labels: data.map((cat) => cat.title),
    showLabels: false,
    datasets: [
      {
        label: "Total",
        data: data.map((cat) => cat.amount),
        backgroundColor: data.map((cat) => cat.color),
        borderRadius: 10,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
    },
    cutout: "50%",
  };
  return <Doughnut data={d} options={options} />;
};

export default WeekDoughnutChart;
