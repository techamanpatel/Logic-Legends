import React, { useState } from 'react';
import { Box, Paper, Typography, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getWeatherData, getMockWeatherData, WeatherData } from '../services/weatherService';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  name?: string;
}

const MapEvents: React.FC<{ onLocationClick: (location: Location) => void }> = ({ onLocationClick }) => {
  useMapEvents({
    click: (e) => {
      onLocationClick({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
};

const WeatherPopup: React.FC<{ weatherData: WeatherData; isMobile: boolean }> = ({ 
  weatherData,
  isMobile 
}) => (
  <Box sx={{ 
    p: isMobile ? 1 : 2, 
    minWidth: isMobile ? '150px' : '200px',
    maxWidth: isMobile ? '200px' : '300px'
  }}>
    <Typography 
      variant={isMobile ? "subtitle2" : "h6"} 
      gutterBottom
      sx={{ 
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      {weatherData.location}
    </Typography>
    <Typography 
      variant={isMobile ? "h5" : "h4"} 
      color="primary" 
      gutterBottom
    >
      {weatherData.temperature}°C
    </Typography>
    <Typography 
      variant={isMobile ? "caption" : "body2"} 
      color="text.secondary" 
      gutterBottom
      sx={{ textTransform: 'capitalize' }}
    >
      {weatherData.description}
    </Typography>
    <Typography variant={isMobile ? "caption" : "body2"}>
      Humidity: {weatherData.humidity}%
    </Typography>
    <Typography variant={isMobile ? "caption" : "body2"}>
      Wind: {weatherData.windSpeed} m/s
    </Typography>
    <Typography 
      variant={isMobile ? "caption" : "body2"} 
      color="error"
      sx={{ fontWeight: 'bold' }}
    >
      AQI: {weatherData.aqi}
    </Typography>
  </Box>
);

const GlobalMap: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [useMockData, setUseMockData] = useState(false);

  const handleLocationClick = async (location: Location) => {
    setSelectedLocation(location);
    setLoading(true);
    try {
      const data = useMockData
        ? getMockWeatherData(location.lat, location.lng)
        : await getWeatherData(location.lat, location.lng);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      height: '100%', 
      width: '100%', 
      position: 'relative',
      overflow: 'hidden',
      '& .leaflet-container': {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      },
      '& .leaflet-popup-content-wrapper': {
        maxWidth: isMobile ? '200px' : '300px',
        maxHeight: '80vh',
        overflow: 'auto'
      }
    }}>
      <MapContainer
        center={[20, 0]}
        zoom={isMobile ? 1 : 2}
        style={{ height: '100%', width: '100%' }}
        zoomControl={!isMobile}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents onLocationClick={handleLocationClick} />
        
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              {loading ? (
                <Box sx={{ 
                  p: isMobile ? 1 : 2, 
                  display: 'flex', 
                  justifyContent: 'center',
                  minWidth: isMobile ? '100px' : '150px'
                }}>
                  <CircularProgress size={isMobile ? 20 : 24} />
                </Box>
              ) : weatherData ? (
                <WeatherPopup weatherData={weatherData} isMobile={isMobile} />
              ) : (
                <Typography variant={isMobile ? "caption" : "body2"}>
                  Click to view weather data
                </Typography>
              )}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </Box>
  );
};

export default GlobalMap; 