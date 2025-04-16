import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Info as InfoIcon, Warning as WarningIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const BoundaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const BoundaryStatus = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: theme.spacing(1),
  borderRadius: '0 0 0 8px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
}));

const StatusIcon = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '3rem',
  },
}));

interface PlanetaryBoundary {
  name: string;
  status: 'breached' | 'safe';
  description: string;
  details: {
    currentValue: string;
    safeLimit: string;
    impact: string;
    solutions: string[];
  };
}

const boundaries: PlanetaryBoundary[] = [
  {
    name: 'Climate Change',
    status: 'breached',
    description: 'Global warming and climate system changes',
    details: {
      currentValue: '1.2°C above pre-industrial levels',
      safeLimit: '1.5°C',
      impact: 'Rising global temperatures, extreme weather events, sea level rise',
      solutions: [
        'Reduce greenhouse gas emissions',
        'Transition to renewable energy',
        'Implement carbon pricing',
        'Protect and restore forests'
      ]
    }
  },
  {
    name: 'Novel Entities',
    status: 'breached',
    description: 'Introduction of new substances and modified life forms',
    details: {
      currentValue: '350,000+ synthetic chemicals',
      safeLimit: 'Unknown',
      impact: 'Chemical pollution, ecosystem disruption, human health risks',
      solutions: [
        'Strict chemical regulation',
        'Green chemistry development',
        'Better waste management',
        'Biodegradable alternatives'
      ]
    }
  },
  {
    name: 'Stratospheric Ozone Depletion',
    status: 'safe',
    description: 'Protection against harmful UV radiation',
    details: {
      currentValue: 'Recovering',
      safeLimit: '1980 levels',
      impact: 'UV radiation protection, skin cancer prevention',
      solutions: [
        'Maintain Montreal Protocol',
        'Monitor ozone levels',
        'Prevent new ozone-depleting substances'
      ]
    }
  },
  {
    name: 'Atmospheric Aerosol Loading',
    status: 'safe',
    description: 'Air quality and climate regulation',
    details: {
      currentValue: 'Within limits',
      safeLimit: 'Regional limits',
      impact: 'Air quality, cloud formation, climate patterns',
      solutions: [
        'Reduce particulate emissions',
        'Clean energy transition',
        'Industrial emission controls'
      ]
    }
  },
  {
    name: 'Ocean Acidification',
    status: 'safe',
    description: 'Marine ecosystem health',
    details: {
      currentValue: 'pH 8.1',
      safeLimit: 'pH 8.2',
      impact: 'Coral reefs, marine life, food chains',
      solutions: [
        'Reduce CO2 emissions',
        'Protect marine ecosystems',
        'Support ocean conservation'
      ]
    }
  },
  {
    name: 'Biogeochemical Flows',
    status: 'breached',
    description: 'Nitrogen and phosphorus cycles',
    details: {
      currentValue: 'Exceeding limits',
      safeLimit: '11 Tg N/year',
      impact: 'Eutrophication, dead zones, biodiversity loss',
      solutions: [
        'Sustainable agriculture',
        'Better fertilizer management',
        'Wastewater treatment',
        'Nutrient recycling'
      ]
    }
  },
  {
    name: 'Freshwater Change',
    status: 'breached',
    description: 'Water cycle and availability',
    details: {
      currentValue: 'Exceeding limits',
      safeLimit: '4000 km³/year',
      impact: 'Water scarcity, ecosystem disruption, food security',
      solutions: [
        'Water conservation',
        'Efficient irrigation',
        'Watershed protection',
        'Water recycling'
      ]
    }
  },
  {
    name: 'Land System Change',
    status: 'breached',
    description: 'Forest cover and land use',
    details: {
      currentValue: '75% of ice-free land modified',
      safeLimit: '75% of ice-free land',
      impact: 'Biodiversity loss, carbon sequestration, ecosystem services',
      solutions: [
        'Forest conservation',
        'Sustainable land use',
        'Urban planning',
        'Ecosystem restoration'
      ]
    }
  },
  {
    name: 'Biosphere Integrity',
    status: 'breached',
    description: 'Biodiversity and ecosystem functioning',
    details: {
      currentValue: 'Extinction rate 100-1000x background',
      safeLimit: '10x background rate',
      impact: 'Species loss, ecosystem collapse, food security',
      solutions: [
        'Habitat protection',
        'Species conservation',
        'Sustainable fishing',
        'Invasive species control'
      ]
    }
  },
];

const PlanetaryBoundaries: React.FC = () => {
  const [selectedBoundary, setSelectedBoundary] = useState<PlanetaryBoundary | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const breachedCount = boundaries.filter(b => b.status === 'breached').length;
  const totalCount = boundaries.length;

  const handleBoundaryClick = (boundary: PlanetaryBoundary) => {
    setSelectedBoundary(boundary);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedBoundary(null);
  };

  const getStatusIcon = (status: 'breached' | 'safe') => {
    return status === 'breached' ? <WarningIcon color="error" /> : <CheckCircleIcon color="success" />;
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Planetary Boundaries
      </Typography>
      <Typography variant="h6" gutterBottom align="center" color="error">
        {breachedCount}/{totalCount} boundaries breached
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {boundaries.map((boundary) => (
          <Grid item xs={12} sm={6} md={4} key={boundary.name}>
            <BoundaryCard onClick={() => handleBoundaryClick(boundary)}>
              <BoundaryStatus
                sx={{
                  bgcolor: boundary.status === 'breached' ? 'error.main' : 'success.main',
                  color: 'white',
                }}
              >
                {boundary.status.toUpperCase()}
              </BoundaryStatus>
              <StatusIcon>
                {getStatusIcon(boundary.status)}
              </StatusIcon>
              <Typography variant="h6" gutterBottom>
                {boundary.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {boundary.description}
              </Typography>
              <Tooltip title="Click for more details">
                <IconButton size="small" sx={{ mt: 1 }}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </BoundaryCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        {selectedBoundary && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={1}>
                {getStatusIcon(selectedBoundary.status)}
                {selectedBoundary.name}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedBoundary.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Current Status
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Current Value: {selectedBoundary.details.currentValue}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Safe Limit: {selectedBoundary.details.safeLimit}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Impact
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedBoundary.details.impact}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Solutions
              </Typography>
              <ul>
                {selectedBoundary.details.solutions.map((solution, index) => (
                  <li key={index}>
                    <Typography variant="body2">{solution}</Typography>
                  </li>
                ))}
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default PlanetaryBoundaries; 