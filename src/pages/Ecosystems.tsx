import { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Forest as ForestIcon,
  Water as WaterIcon,
  Park as ParkIcon,
} from '@mui/icons-material';
import { getEcosystemData } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface EcosystemData {
  forestCover: number;
  oceanHealth: number;
  wetlandArea: number;
}

const mockData = {
  forestCover: 31,
  oceanHealth: 70,
  wetlandArea: 12.1,
};

export default function Ecosystems() {
  const [data, setData] = useState<EcosystemData>(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ecosystemData = await getEcosystemData();
        setData(ecosystemData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ecosystem data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading ecosystem data..." />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Ecosystem Health
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Forest Cover
            </Typography>
            <Typography variant="h4" color="success.main">
              {data.forestCover}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Percentage of land covered by forests
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ocean Health
            </Typography>
            <Typography variant="h4" color="info.main">
              {data.oceanHealth}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Global ocean health index
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Wetland Area
            </Typography>
            <Typography variant="h4" color="primary">
              {data.wetlandArea} million km²
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Global wetland coverage
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Key Findings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ForestIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Forest Ecosystems"
                  secondary="Forests cover 31% of the Earth's land surface, providing habitat for 80% of terrestrial species."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WaterIcon color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="Ocean Ecosystems"
                  secondary="Oceans cover 71% of the Earth's surface and contain 97% of the Earth's water."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ParkIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Wetland Ecosystems"
                  secondary="Wetlands are among the most productive ecosystems, supporting diverse plant and animal life."
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 