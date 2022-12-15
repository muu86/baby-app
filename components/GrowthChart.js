import { Skeleton, useTheme } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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

const transformDatasets = ({ userInput, type, data, theme }) => {
  if (!data) return null;
  if (!userInput || !userInput[type]) {
    const defaultValue = type == 'height' ? 49.9 : 3.3;
    return transformDatasets({
      userInput: { gender: 1, month: 0, [type]: defaultValue },
      type,
      data,
      theme,
    });
  }

  const { month, gender } = userInput;
  const userInputOfType = userInput[type];

  const monthStart = Math.max(month - 5, 0);
  const monthEnd = Math.min(month + 5, 227);

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
        label: '내 아이',
        data: userTypeData,
        borderColor: theme.palette.chart['user'],
        backgroundColor: theme.palette.chart['user'],
        pointRadius: 5,
      },
      {
        label: '10분위',
        data: rangeFiltered.map((r) => r[type].percentiles[3]),
        borderColor: theme.palette.chart['10th'],
        backgroundColor: theme.palette.chart['10th'],
        pointRadius: 0,
      },
      {
        label: '25분위',
        data: rangeFiltered.map((r) => r[type].percentiles[5]),
        borderColor: theme.palette.chart['25th'],
        backgroundColor: theme.palette.chart['25th'],
        pointRadius: 0,
      },
      {
        label: '평균',
        data: rangeFiltered.map((r) => r[type].lms[1]),
        borderColor: theme.palette.chart['50th'],
        backgroundColor: theme.palette.chart['50th'],
        pointRadius: 0,
      },
      {
        label: '75분위',
        data: rangeFiltered.map((r) => r[type].percentiles[7]),
        borderColor: theme.palette.chart['75th'],
        backgroundColor: theme.palette.chart['75th'],
        pointRadius: 0,
      },
      {
        label: '90분위',
        data: rangeFiltered.map((r) => r[type].percentiles[9]),
        borderColor: theme.palette.chart['90th'],
        backgroundColor: theme.palette.chart['90th'],
        pointRadius: 0,
      },
    ],
  };
};

// type: "height" | "weight"
export default function GrowthChart({ userInput, type, data }) {
  const theme = useTheme();
  const chartData = transformDatasets({ userInput, type, data, theme });
  const unit = type === 'height' ? 'cm' : 'kg';

  return chartData ? (
    <Line
      options={{
        animation: {
          duration: 0,
        },
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
            title: { display: true, text: unit },
          },
        },
      }}
      data={chartData}
    />
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
