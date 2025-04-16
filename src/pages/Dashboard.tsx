import { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Button,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PlanetaryBoundaries from '../components/PlanetaryBoundaries';
import Reports from '../components/Reports';
import HeroSection from '../components/HeroSection';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DashboardData {
  temperature: number;
  co2Level: number;
  forestCover: number;
  biodiversityIndex: number;
  airQuality: number;
}

const mockData = {
  temperature: 1.2,
  co2Level: 415,
  forestCover: 31,
  biodiversityIndex: 0.68,
  airQuality: 75,
};

const timeSeriesData = [
  { year: '2018', temperature: 0.8, co2: 408 },
  { year: '2019', temperature: 0.9, co2: 410 },
  { year: '2020', temperature: 1.0, co2: 412 },
  { year: '2021', temperature: 1.1, co2: 414 },
  { year: '2022', temperature: 1.2, co2: 415 },
];

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const IndicatorCard = ({ title, value, unit, color }: { title: string; value: number; unit: string; color: string }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
            <CircularProgress />
          </Box>
        ) : (
          <Typography variant="h4" component="div" sx={{ color }}>
            {value}{unit}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <HeroSection />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Key Indicators */}
        <Typography variant="h4" gutterBottom>
          Key Environmental Indicators
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <IndicatorCard
              title="Global Temperature Anomaly"
              value={data.temperature}
              unit="°C"
              color="#ff4444"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <IndicatorCard
              title="CO₂ Level"
              value={data.co2Level}
              unit=" ppm"
              color="#ffbb33"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <IndicatorCard
              title="Forest Cover"
              value={data.forestCover}
              unit="%"
              color="#00C851"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <IndicatorCard
              title="Biodiversity Index"
              value={data.biodiversityIndex}
              unit=""
              color="#33b5e5"
            />
          </Grid>
        </Grid>

        {/* Planetary Boundaries */}
        <PlanetaryBoundaries />

        {/* Reports Section */}
        <Reports />

        {/* Charts and Map */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Global Environmental Trends
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
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Global Impact Map
              </Typography>
              <Box sx={{ height: 'calc(100% - 40px)' }}>
                <MapContainer
                  center={[20, 0]}
                  zoom={2}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[20, 0]}>
                    <Popup>
                      Global Environmental Impact
                    </Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 