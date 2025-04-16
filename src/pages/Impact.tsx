import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Lightbulb as LightbulbIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import ImpactCard from '../components/ImpactCard';
import { getEnvironmentalData } from '../services/api';

interface ImpactData {
  environmentalData: {
    temperature: number;
    co2Level: number;
    forestCover: number;
    biodiversityIndex: number;
    airQuality: number;
  };
  recommendations: string[];
}

export default function Impact() {
  const [data, setData] = useState<ImpactData>({
    environmentalData: {
      temperature: 0,
      co2Level: 0,
      forestCover: 0,
      biodiversityIndex: 0,
      airQuality: 0,
    },
    recommendations: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const environmentalData = await getEnvironmentalData();
        setData({
          environmentalData,
          recommendations: [
            'Reduce carbon footprint by using public transportation or carpooling',
            'Support renewable energy initiatives in your community',
            'Participate in local conservation efforts and tree planting programs',
            'Reduce waste by practicing recycling and composting',
            'Support organizations working to protect biodiversity',
          ],
        });
      } catch (error) {
        console.error('Error fetching impact data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Environmental Impact & Recommendations
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <ImpactCard
            title="Temperature Rise"
            value={data.environmentalData.temperature}
            maxValue={2}
            unit="°C"
            description="Global temperature anomaly compared to pre-industrial levels"
            color="#ff4444"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ImpactCard
            title="CO₂ Levels"
            value={data.environmentalData.co2Level}
            maxValue={450}
            unit="ppm"
            description="Atmospheric CO₂ concentration"
            color="#ffbb33"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ImpactCard
            title="Forest Cover"
            value={data.environmentalData.forestCover}
            maxValue={100}
            unit="%"
            description="Percentage of land covered by forests"
            color="#00C851"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ImpactCard
            title="Biodiversity Index"
            value={data.environmentalData.biodiversityIndex}
            maxValue={1}
            unit=""
            description="Global biodiversity health index (0-1)"
            color="#33b5e5"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recommended Actions
            </Typography>
            <List>
              {data.recommendations.map((recommendation, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <LightbulbIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={recommendation} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Current Trends
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TrendingUpIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Rising Global Temperatures"
                  secondary="Global temperatures continue to rise at an unprecedented rate"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Declining Biodiversity"
                  secondary="Species extinction rates are 100-1000 times higher than natural background rates"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Renewable Energy Growth"
                  secondary="Global renewable energy capacity continues to increase"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Policy Implications
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Climate Action"
                  secondary="Urgent need for stronger climate policies and international cooperation"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Conservation Efforts"
                  secondary="Increased investment in biodiversity conservation and habitat protection"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Sustainable Development"
                  secondary="Integration of environmental considerations into economic development plans"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 