import styles from '../../styles/Test.module.css';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <span>With default Theme:</span>
      </div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />

      <Typography>MINJE KIM</Typography>
      <Typography>김민제</Typography>
    </div>
  );
}
