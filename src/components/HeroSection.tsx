import React from 'react';
import { Box, Typography, Button, Grid, Paper, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { handleLearnMore, handleDownloadLatestReport } from '../services/reportService';

const HeroBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  color: 'white',
  padding: theme.spacing(4),
  width: '100%',
}));

const GlobeContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, transparent 50%)',
    animation: 'rotate 10s linear infinite',
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

const EarthImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
  animation: 'pulse 2s ease-in-out infinite',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 0.8,
    },
    '50%': {
      transform: 'scale(1.05)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 0.8,
    },
  },
});

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const HeroSection: React.FC = () => {
  const handleEarthClick = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/reports/pdfs/planetaryhealthcheck2024_report.pdf';
    link.download = 'planetaryhealthcheck2024_report.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <HeroBackground>
      <HeroContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Planetary Health Dashboard
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
              Monitoring Earth's Vital Signs
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.8 }}>
              Track global environmental indicators, analyze trends, and access comprehensive reports
              on the health of our planet.
            </Typography>
            
          </Grid>
          <Grid item xs={12} md={6}>
            <Tooltip title="Click to download Planetary Health Check 2024 Report" placement="top">
              <GlobeContainer onClick={handleEarthClick}>
                <EarthImage 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/600px-Earth_Western_Hemisphere_transparent_background.png"
                  alt="Earth - Click to download report"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/600px-Earth_Western_Hemisphere_transparent_background.png';
                  }}
                />
              </GlobeContainer>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Typography variant="h4" gutterBottom>
                6/9
              </Typography>
              <Typography variant="body1">
                Planetary Boundaries Breached
              </Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Typography variant="h4" gutterBottom>
                1.2°C
              </Typography>
              <Typography variant="body1">
                Global Temperature Rise
              </Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Typography variant="h4" gutterBottom>
                1M+
              </Typography>
              <Typography variant="body1">
                Species at Risk
              </Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Typography variant="h4" gutterBottom>
                415 ppm
              </Typography>
              <Typography variant="body1">
                CO₂ Levels
              </Typography>
            </StatCard>
          </Grid>
        </Grid>
      </HeroContent>
    </HeroBackground>
  );
};

export default HeroSection; 