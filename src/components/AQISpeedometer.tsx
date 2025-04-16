import React from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AQISpeedometerProps {
  value: number;
  size?: number;
  thickness?: number;
}

const SpeedometerContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

const getAQIColor = (value: number): string => {
  if (value <= 50) return '#00e400'; // Good
  if (value <= 100) return '#ffff00'; // Moderate
  if (value <= 150) return '#ff7e00'; // Unhealthy for Sensitive Groups
  if (value <= 200) return '#ff0000'; // Unhealthy
  if (value <= 300) return '#99004c'; // Very Unhealthy
  return '#7e0023'; // Hazardous
};

const getAQILevel = (value: number): string => {
  if (value <= 50) return 'Good';
  if (value <= 100) return 'Moderate';
  if (value <= 150) return 'Unhealthy for Sensitive Groups';
  if (value <= 200) return 'Unhealthy';
  if (value <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

const AQISpeedometer: React.FC<AQISpeedometerProps> = ({ 
  value, 
  size = 200, 
  thickness = 10 
}) => {
  const normalizedValue = Math.min(Math.max(value, 0), 500);
  const percentage = (normalizedValue / 500) * 100;
  const color = getAQIColor(normalizedValue);
  const level = getAQILevel(normalizedValue);

  return (
    <SpeedometerContainer elevation={3}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={size}
          thickness={thickness}
          sx={{
            color,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div" color="text.secondary">
            {normalizedValue}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Air Quality Index
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {level}
      </Typography>
    </SpeedometerContainer>
  );
};

export default AQISpeedometer; 