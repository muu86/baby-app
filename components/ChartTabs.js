import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import GrowthChart from './GrowthChart';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-chart-${index}`}
      aria-labelledby={`tab-chart-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-chart-${index}`,
    'aria-controls': `tabpanel-chart-${index}`,
  };
}

export default function ChartTabs({ typeHandler, userInput, data }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    console.log(newValue);
    if (newValue == 0) {
      typeHandler('height');
    } else {
      typeHandler('weight');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs for charts"
          centered
        >
          <Tab label="신장 그래프" {...a11yProps(0)} />
          <Tab label="몸무게 그래프" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GrowthChart userInput={userInput} type="height" data={data} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GrowthChart userInput={userInput} type="weight" data={data} />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}
