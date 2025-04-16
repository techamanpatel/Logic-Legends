import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getWeatherData, getMockWeatherData, WeatherData } from '../services/weatherService';
import AQISpeedometer from './AQISpeedometer';

interface WeatherInfoProps {
  latitude: number;
  longitude: number;
  locationName?: string;
  useMockData?: boolean;
}

const InfoContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

const WeatherInfo: React.FC<WeatherInfoProps> = ({ 
  latitude, 
  longitude, 
  locationName,
  useMockData = false 
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = useMockData 
          ? getMockWeatherData(latitude, longitude)
          : await getWeatherData(latitude, longitude);
        
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude, useMockData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !weatherData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <Typography color="error">{error || 'No data available'}</Typography>
      </Box>
    );
  }

  return (
    <InfoContainer elevation={3}>
      <Typography variant="h5" gutterBottom>
        {locationName || weatherData.location}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AQISpeedometer value={weatherData.aqi} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              {weatherData.temperature}°C
            </Typography>
            <Typography variant="body1" gutterBottom>
              {weatherData.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Humidity: {weatherData.humidity}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Wind Speed: {weatherData.windSpeed} m/s
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </InfoContainer>
  );
};

export default WeatherInfo; 