import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ChartTabs from '../components/ChartTabs';
import api from '../utils/api';
import { getUserPercentile } from '../utils/calculator';

const validateUserInput = ({ gender, month, height, weight }) => {
  if (!month || !gender) return false;
  if (!height && !weight) return false;
  return true;
};

export default function Home() {
  const [data, setData] = useState(null);
  const [userHeightPercentile, setUserHeightPercentile] = useState(0.0);
  const [userWeightPercentile, setUserWeightPercentile] = useState(0.0);
  const [userInput, setUserInput] = useState({});

  const monthInput = useRef(null);
  const heightInput = useRef(null);
  const weightInput = useRef(null);

  useEffect(() => {
    (async () => {
      const apiData = await api.getAllData();

      setData(apiData);
    })();
  }, []);

  useEffect(() => {
    if (!data) return;
    if (!validateUserInput(userInput)) return;

    const userPercentile = getUserPercentile(userInput, data);

    if (userPercentile.height) setUserHeightPercentile(userPercentile.height);
    if (userPercentile.weight) setUserWeightPercentile(userPercentile.weight);
  }, [userInput, data]);

  const handleMale = () => {
    setUserInput({
      ...userInput,
      gender: 1,
    });
  };

  const handleFemale = () => {
    setUserInput({
      ...userInput,
      gender: 2,
    });
  };

  const handleMonths = (e) => {
    e.preventDefault();

    if (data) {
      if (e.target.value >= data.length / 2) {
        monthInput.current.value = data.length / 2;
      } else if (e.target.value < 0) {
        monthInput.current.value = 0;
      }
    }

    setUserInput({
      ...userInput,
      month: +e.target.value,
    });
  };

  const handleHeight = (e) => {
    e.preventDefault();

    if (e.target.value < 0) {
      heightInput.current.value = 0;
    } else if (e.target.value >= 200) {
      heightInput.current.value = 200;
    }

    setUserInput({
      ...userInput,
      height: +e.target.value,
    });
  };

  const handleWeight = (e) => {
    e.preventDefault();

    if (e.target.value < 0) {
      weightInput.current.value = 0;
    } else if (e.target.value >= 200) {
      weightInput.current.value = 200;
    }

    setUserInput({
      ...userInput,
      weight: +e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          아이 성장 체크
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Avatar
          variant="rounded"
          sx={{ m: 1, width: 50, height: 50, bgcolor: 'primary.main' }}
        >
          <ScaleIcon />
        </Avatar> */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, ml: 4, mr: 4 }}
        >
          <Grid container spacing={2}>
            {/* START - 개월 수 */}
            {/* START - 성별 */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ButtonGroup fullWidth>
                  <Button
                    // fullWidth
                    // variant="contained"
                    onClick={handleMale}
                    size="large"
                    color={userInput.gender === 1 ? 'primary' : 'grey'}
                    startIcon={<FaceIcon />}
                  >
                    남아
                  </Button>
                  <Button
                    // fullWidth
                    // variant="contained"
                    onClick={handleFemale}
                    size="large"
                    color={userInput.gender === 2 ? 'primary' : 'grey'}
                    startIcon={<Face3Icon />}
                  >
                    여아
                  </Button>
                </ButtonGroup>
              </Box>
            </Grid>
            {/* END - 성별 */}
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
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
                onChange={handleMonths}
                inputRef={monthInput}
              />
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
                onChange={handleHeight}
                inputRef={heightInput}
                inputProps={{ step: '0.1' }}
              />
            </Grid>
            {/* END - 키 */}

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
                ref={weightInput}
                onChange={handleWeight}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                pl: 2,
                pr: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              {/* <PercentileSlider value={value} /> */}
              <Typography
                component="h1"
                variant="h4"
                textAlign="center"
              >{`${userHeightPercentile}%`}</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                pl: 2,
                pr: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                textAlign="center"
              >{`${userWeightPercentile}%`}</Typography>
            </Grid>
            {/* END - 몸무게 */}
          </Grid>
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            확인
          </Button> */}
          {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
      {/* <Box
        // fullWidth
        sx={{
          marginTop: 2,
          width: 350,
          height: 350,
        }}
      >
        <GrowthChart userInput={userInput} data={data} />
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {data ? (
          <ChartTabs userInput={userInput} data={data} />
        ) : (
          <Skeleton fullWidth sx={{ width: 500, height: 500 }} />
        )}
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}

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
