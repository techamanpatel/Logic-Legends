import React from 'react';
import { Box, Typography, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import GlobalMap from '../components/GlobalMap';

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const MapContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  '& .leaflet-container': {
    height: '100%',
    width: '100%',
  }
}));

const Pollution: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      py: { xs: 2, sm: 3, md: 4 }, 
      px: { xs: 1, sm: 2, md: 4 },
      height: '100%',
      overflow: 'hidden'
    }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom 
        align="center" 
        sx={{ mb: 1 }}
      >
        Global Air Quality
      </Typography>
      <Typography 
        variant={isMobile ? "body2" : "subtitle1"} 
        gutterBottom 
        align="center" 
        color="text.secondary" 
        sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
      >
        Monitor air quality and pollution levels worldwide
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Map Section */}
        <Grid item xs={12}>
          <MapContainer sx={{ 
            height: { xs: '400px', sm: '500px', md: '600px' }
          }}>
            <SectionTitle variant={isMobile ? "subtitle1" : "h6"}>
              Global Air Quality Map
            </SectionTitle>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <GlobalMap />
            </Box>
          </MapContainer>
        </Grid>

        {/* Key Indicators Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <SectionTitle variant={isMobile ? "subtitle1" : "h6"}>
              Key Air Quality Indicators
            </SectionTitle>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6} sm={6} md={3}>
                <StatCard elevation={2}>
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    color="primary" 
                    sx={{ mb: 1 }}
                  >
                    7M
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"}>
                    Premature deaths annually due to air pollution
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <StatCard elevation={2}>
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    color="primary" 
                    sx={{ mb: 1 }}
                  >
                    91%
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"}>
                    Of people breathe unhealthy air
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <StatCard elevation={2}>
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    color="primary" 
                    sx={{ mb: 1 }}
                  >
                    97%
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"}>
                    Of cities exceed WHO guidelines
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <StatCard elevation={2}>
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    color="primary" 
                    sx={{ mb: 1 }}
                  >
                    1-2%
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"}>
                    Annual increase in ozone levels
                  </Typography>
                </StatCard>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pollution; 