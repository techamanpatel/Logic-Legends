import { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getClimateData } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface ClimateData {
  temperature: number;
  co2Level: number;
  seaLevel: number;
  arcticIce: number;
}

const mockData = {
  temperature: 1.2,
  co2Level: 415,
  seaLevel: 3.3,
  arcticIce: 3.8,
};

const timeSeriesData = [
  { year: '2018', temperature: 0.8, co2: 408, seaLevel: 3.0, arcticIce: 4.2 },
  { year: '2019', temperature: 0.9, co2: 410, seaLevel: 3.1, arcticIce: 4.1 },
  { year: '2020', temperature: 1.0, co2: 412, seaLevel: 3.2, arcticIce: 4.0 },
  { year: '2021', temperature: 1.1, co2: 414, seaLevel: 3.25, arcticIce: 3.9 },
  { year: '2022', temperature: 1.2, co2: 415, seaLevel: 3.3, arcticIce: 3.8 },
];

export default function ClimateChange() {
  const [data, setData] = useState<ClimateData>(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const climateData = await getClimateData();
        setData(climateData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching climate data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading climate data..." />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Climate Change Indicators
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Global Temperature Anomaly
            </Typography>
            <Typography variant="h4" color="error">
              {data.temperature}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Above pre-industrial levels
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              CO₂ Level
            </Typography>
            <Typography variant="h4" color="warning.main">
              {data.co2Level} ppm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Atmospheric concentration
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sea Level Rise
            </Typography>
            <Typography variant="h4" color="info.main">
              {data.seaLevel} mm/year
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Global average
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Arctic Sea Ice
            </Typography>
            <Typography variant="h4" color="primary">
              {data.arcticIce} million km²
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Annual minimum extent
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Climate Change Trends
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ff4444"
                  name="Temperature (°C)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="co2"
                  stroke="#ffbb33"
                  name="CO₂ (ppm)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="seaLevel"
                  stroke="#33b5e5"
                  name="Sea Level (mm/year)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="arcticIce"
                  stroke="#00C851"
                  name="Arctic Ice (million km²)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 