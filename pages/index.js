import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import ScaleIcon from '@mui/icons-material/Scale';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import GrowthChart from '../components/GrowthChart';
import PercentileSlider from '../components/PercentileSlider';
import api from '../utils/api';
import { getUserPercentile } from '../utils/calculator';

export default function Home() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0.0);
  const [userInput, setUserInput] = useState({});

  const monthInput = useRef(null);
  const heightInput = useRef(null);

  useEffect(() => {
    (async () => {
      const apiData = await api.getAllData();

      setData(apiData);
    })();
  }, []);

  useEffect(() => {
    if (!data) return;
    if (!userInput.height || !userInput.month || !userInput.gender) return;

    setValue(getUserPercentile(userInput, data));
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

  const handleSubmit = (event) => {
    event.preventDefault();
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
                color={userInput.gender === 1 ? 'primary' : 'grey'}
                startIcon={<FaceIcon />}
              >
                남아
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleFemale}
                size="large"
                color={userInput.gender === 2 ? 'primary' : 'grey'}
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
                onChange={handleMonths}
                inputRef={monthInput}
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
                onChange={handleHeight}
                inputRef={heightInput}
                inputProps={{ step: '0.1' }}
              />
            </Grid>
            {/* END - 키 */}

            {/* START- 키 백분위 슬라이더 */}
            <Grid item xs={12}>
              <PercentileSlider value={value} />
            </Grid>
            {/* END- 키 백분위 슬라이더 */}

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
        <Box
          // fullWidth
          sx={{
            marginTop: 2,
            width: 500,
            height: 500,
          }}
        >
          <GrowthChart userInput={userInput} data={data} />
        </Box>
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
