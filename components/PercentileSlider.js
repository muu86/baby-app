import { Slider, Typography } from '@mui/material';

export default function PercentileSlider({ value }) {
  return (
    <>
      <Slider
        aria-label="percentiles"
        defaultValue={50}
        value={value}
        // disabled
        // getAriaValueText={(value) => `${value}th`}
        valueLabelDisplay="auto"
        step={0.01}
        // disabled
        marks={percentilesMarks}
      />
      <Typography
        align="center"
        sx={{ mt: 1, mb: 1 }}
        variant="h5"
      >{`${value}%`}</Typography>
    </>
  );
}

const percentilesMarks = [
  // {
  //   value: 1,
  //   label: '1',
  // },
  // {
  //   value: 3,
  //   label: '3',
  // },
  {
    value: 5,
    label: '5',
  },
  // {
  //   value: 10,
  //   label: '10',
  // },
  {
    value: 15,
    label: '15',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 75,
    label: '75',
  },
  {
    value: 85,
    label: '85',
  },
  // {
  //   value: 90,
  //   label: '90',
  // },
  {
    value: 95,
    label: '95',
  },
  // {
  //   value: 97,
  //   label: '97',
  // },
  // {
  //   value: 99,
  //   label: '99',
  // },
];
