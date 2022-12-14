import { Skeleton } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
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
  Legend
);

const validateUserInput = (userInput) => {
  if (!userInput) return false;

  const { gender, month, height } = userInput;
  if (!gender) return false;
  if (!month) return false;
  if (!height) return false;

  return true;
};

const generateDefaultUserInput = () => {
  return {
    gender: 1,
    month: 0,
    height: 50,
  };
};

const transformDatasets = (userInput, data) => {
  const { month, gender, height } = userInput;

  const monthStart = Math.max(month - 10, 0);
  const monthEnd = Math.min(month + 10, 227);

  const rangeFiltered = data.filter((r) => {
    return r.gender == gender && r.month >= monthStart && r.month <= monthEnd;
  });

  const userData = rangeFiltered.map((r) => {
    if (r.month == month) {
      return height;
    }
    return null;
  });

  return {
    labels: rangeFiltered.map((r) => r.month),
    datasets: [
      {
        label: '-1SD',
        data: rangeFiltered.map((r) => r.standardScore[2]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '평균',
        data: rangeFiltered.map((r) => r.standardScore[3]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '+1SD',
        data: rangeFiltered.map((r) => r.standardScore[4]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        label: '내 아이',
        data: userData,
        pointRadius: 5,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};

export default function GrowthChart({ userInput, data }) {
  let chartData = null;
  if (data) {
    if (!validateUserInput(userInput)) {
      chartData = transformDatasets(generateDefaultUserInput(), data);
    }
    chartData = transformDatasets(userInput, data);
  }

  return chartData ? (
    <Line
      options={{
        responsive: true,
        aspectRatio: 1,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '연령 별 신장',
          },
        },
        scales: {
          x: {
            title: { display: true, text: '개월' },
            // ticks: {
            //   callback: (v, i, t) => {
            //     console.log(v, i, t);
            //     return `${v}개월`;
            //   },
            //   autoSkip: false,
            // },
            // display: true,
          },
          y: {
            ticks: {
              callback: (v) => `${v}cm`,
              // autoSkip: false,
            },
          },
        },
      }}
      data={chartData}
    />
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
