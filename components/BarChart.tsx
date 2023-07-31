"use client";

import React, { Dispatch, SetStateAction } from "react";
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
  setCategory: Dispatch<SetStateAction<string>>;
  selected: string;
};

const BarChart: React.FC<Props> = ({ data, setCategory, selected }) => {
  const d = {
    labels: data.map((cat) => cat.title),
    datasets: [
      {
        data: data.map((cat) => cat.amount),
        backgroundColor: data.map((cat) => cat.color),
      },
    ],
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
    onClick: (event, elements: any) => {
      // Check if any element was clicked
      if (elements.length > 0) {
        const clickedBarIndex = elements[0].index;
        if (selected == data[clickedBarIndex].id) {
          setCategory("");
          return;
        }
        setCategory(data[clickedBarIndex].id);
      }
    },
  };

  return <Bar options={options} data={d} />;
};

export default BarChart;
