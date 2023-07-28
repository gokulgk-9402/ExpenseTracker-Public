"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type CategoryWithAmount = {
  title: string;
  id: string;
  color: string;
  amount: number;
};

type Props = {
  data: CategoryWithAmount[];
};

const options = {
  scales: {
    x: {
      display: false, // Set display to false to hide the labels under each bar
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  barThickness: 30,
};

const BarChart: React.FC<Props> = ({ data }) => {
  const d = {
    labels: data.map((cat) => cat.title),
    datasets: [
      {
        data: data.map((cat) => cat.amount),
        backgroundColor: data.map((cat) => cat.color),
      },
    ],
  };

  return <Bar options={options} data={d} />;
};

export default BarChart;
