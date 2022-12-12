import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import ScaleIcon from '@mui/icons-material/Scale';
import {
  InputAdornment,
  Slider,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { getZ, getPercentileFromZ } from '../../utils/calculator';

const API_URL =
  'https://20j4xpf7sj.execute-api.ap-northeast-2.amazonaws.com/Prod/percentile';

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
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

export default function PercentileCalculator() {
  const [isMale, setIsMale] = useState(true);
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0.0);

  const handleMale = () => {
    setIsMale(true);
  };

  const handleFemale = () => {
    setIsMale(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      isMale,
      months: +data.get('months'),
      height: +data.get('height'),
      weight: +data.get('weight'),
    });

    getHeightByMonthData(
      isMale ? '1' : '2',
      data.get('months'),
      data.get('height')
    );
  };

  const getHeightByMonthData = (gender, month, height) => {
    axios
      .get(API_URL + '/height-by-month', {
        params: { gender, month },
      })
      .then((res) => {
        setData(res.data.Item);
        console.log(data);
        const zScore = getZ(height, data.lms[1], data.lms[2]);
        console.log(zScore);
        const percentile = getPercentileFromZ(zScore);
        console.log(percentile);

        setValue(percentile.toFixed(4) * 100);
        console.log(value);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          variant="rounded"
          sx={{ m: 1, width: 50, height: 50, bgcolor: 'primary.main' }}
        >
          <ScaleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          아이 성장 체크
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* START - 성별 */}
            <Grid item xs={6}>
              <Button
                onClick={handleMale}
                size="large"
                color={isMale ? 'primary' : 'grey'}
                startIcon={<FaceIcon />}
              >
                남아
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleFemale}
                size="large"
                color={isMale ? 'grey' : 'primary'}
                startIcon={<Face3Icon />}
              >
                여아
              </Button>
            </Grid>
            {/* END - 성별 */}

            {/* START - 개월 수 */}
            <Grid item xs={12}>
              {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <MenuIcon />
                </IconButton> */}
              <TextField
                type="number"
                fullWidth
                // sx={{ flex: 1 }}
                name="months"
                label="개월 수"
                placeholder="0"
                InputProps={{
                  'aria-label': 'months',
                  endAdornment: (
                    <InputAdornment position="end">개월</InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <IconButton
                type="button"
                sx={{ p: '10px' }}
                // aria-label="search"
              >
                <ArrowDropDownIcon />
              </IconButton> */}
              {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  color="primary"
                  sx={{ p: '10px' }}
                  aria-label="directions"
                >
                  <DirectionsIcon />
                </IconButton> */}
            </Grid>
            {/* END - 개월 수 */}

            {/* START - 키 */}
            <Grid item xs={12}>
              <TextField
                type="number"
                // required
                fullWidth
                id="height"
                label="키"
                name="height"
                placeholder="50.15"
                // autoComplete="family-name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* END - 키 */}
            {/* START- 키 백분위 */}
            <Grid item xs={12}>
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
              <Typography>{`${value}%`}</Typography>
            </Grid>

            {/* END- 키 백분위 */}
            {/* START - 몸무게 */}
            <Grid item xs={12}>
              <TextField
                type="number"
                // required
                fullWidth
                // id="email"
                label="몸무게"
                name="weight"
                // autoComplete="email"
                placeholder="5.5"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* END - 몸무게 */}
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="new-password"
              />
            </Grid> */}
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            확인
          </Button>
          {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}
