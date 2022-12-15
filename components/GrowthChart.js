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

const generateDefaultUserInput = () => {
  return {
    gender: 1,
    month: 0,
    height: 50,
    weight: 3.3,
  };
};

const transformDatasets = (userInput, data) => {
  const { month, gender, height, weight } = userInput;

  const monthStart = Math.max(month - 10, 0);
  const monthEnd = Math.min(month + 10, 227);

  const rangeFiltered = data.filter((r) => {
    return r.gender == gender && r.month >= monthStart && r.month <= monthEnd;
  });

  const userHeightData = rangeFiltered.map((r) => {
    if (r.month == month) {
      return height;
    }
    return null;
  });

  const userWeightData = rangeFiltered.map((r) => {
    if (r.month == month) {
      return weight;
    }
    return null;
  });

  return {
    labels: rangeFiltered.map((r) => r.month),
    datasets: [
      {
        label: '키 평균',
        data: rangeFiltered.map((r) => r.height.lms[1]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
        yAxisID: 'y',
      },
      {
        label: '몸무게 평균',
        data: rangeFiltered.map((r) => r.weight.lms[1]),
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
        yAxisID: 'y1',
      },
      // {
      //   label: '1',
      //   data: rangeFiltered.map((r) => r.standardScore[2]),
      //   // borderColor: 'rgb(255, 99, 132)',
      //   // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      //   pointRadius: 0,
      // },
      // {
      //   label: '평균',
      //   data: rangeFiltered.map((r) => r.standardScore[3]),
      //   // borderColor: 'rgb(255, 99, 132)',
      //   // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      //   pointRadius: 0,
      // },
      // {
      //   label: '+1SD',
      //   data: rangeFiltered.map((r) => r.standardScore[4]),
      //   // borderColor: 'rgb(255, 99, 132)',
      //   // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      //   pointRadius: 0,
      // },
      // {
      //   label: '+2d',
      //   data: rangeFiltered.map((r) => r.standardScore[5]),
      //   // borderColor: 'rgb(255, 99, 132)',
      //   // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      //   pointRadius: 0,
      // },
      {
        label: '내 아이 키',
        data: userHeightData,
        pointRadius: 5,
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: '내 아이 몸무게',
        data: userWeightData,
        pointRadius: 5,
        yAxisID: 'y1',
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};

export default function GrowthChart({ userInput, data }) {
  let chartData = null;
  // const [chartData, setChartData] = useState(null);

  if (data) {
    if (!validateUserInput(userInput)) {
      chartData = transformDatasets(generateDefaultUserInput(), data);
    } else {
      chartData = transformDatasets(userInput, data);
    }
    console.log('chart is ', chartData);
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
            // display: true,
            // text: '연령 별 신장',
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
            title: { display: true, text: 'cm' },
            position: 'left',
            ticks: {
              // callback: (v) => `${v}cm`,
              // autoSkip: false,
            },
          },
          y1: {
            title: { display: true, text: 'kg' },
            position: 'right',
            grid: {
              drawOnChartArea: false,
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
