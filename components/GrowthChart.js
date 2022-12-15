import { Skeleton, Typography } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Colors,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../utils/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const validateUserInput = (userInput) => {
  if (!userInput) return false;

  const { gender, month, height, weight } = userInput;
  if (!gender) return false;
  if (!month) return false;
  if (!height && !weight) return false;

  return true;
};

const transformDatasets = (userInput, type, data) => {
  if (!data) return null;
  if (!userInput || !userInput[type]) {
    const defaultValue = type == 'height' ? 49.9 : 3.3;
    return transformDatasets(
      { gender: 1, month: 0, [type]: defaultValue },
      type,
      data
    );
  }

  const { month, gender } = userInput;
  const userInputOfType = userInput[type];

  const monthStart = Math.max(month - 10, 0);
  const monthEnd = Math.min(month + 10, 227);

  const rangeFiltered = data.filter((r) => {
    return r.gender == gender && r.month >= monthStart && r.month <= monthEnd;
  });

  const userTypeData = rangeFiltered.map((r) => {
    if (r.month == month) {
      return userInputOfType;
    }
    return null;
  });

  return {
    labels: rangeFiltered.map((r) => r.month),
    datasets: [
      {
        label: '10분위',
        data: rangeFiltered.map((r) => r[type].percentiles[3]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '25분위',
        data: rangeFiltered.map((r) => r[type].percentiles[5]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '평균',
        data: rangeFiltered.map((r) => r[type].lms[1]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '75분위',
        data: rangeFiltered.map((r) => r[type].percentiles[7]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '90분위',
        data: rangeFiltered.map((r) => r[type].percentiles[9]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '내 아이',
        data: userTypeData,
        pointRadius: 5,
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};

// type: "height" | "weight"
export default function GrowthChart({ userInput, type, data }) {
  const chartData = transformDatasets(userInput, type, data);

  return chartData ? (
    <Line
      options={{
        responsive: true,
        aspectRatio: 1,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: { display: true, text: '개월' },
          },
          y: {
            title: { display: true, text: 'cm' },
          },
        },
      }}
      data={chartData}
    />
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
