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
  Pets as PetsIcon,
  Warning as WarningIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { getBiodiversityData } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface BiodiversityData {
  speciesCount: number;
  endangeredSpecies: number;
  extinctionRate: number;
}

const mockData = {
  speciesCount: 8500000,
  endangeredSpecies: 40000,
  extinctionRate: 1000,
};

export default function Biodiversity() {
  const [data, setData] = useState<BiodiversityData>(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const biodiversityData = await getBiodiversityData();
        setData(biodiversityData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching biodiversity data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading biodiversity data..." />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Biodiversity Status
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Total Species
            </Typography>
            <Typography variant="h4" color="primary">
              {data.speciesCount.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estimated number of species on Earth
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Endangered Species
            </Typography>
            <Typography variant="h4" color="error">
              {data.endangeredSpecies.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Species at risk of extinction
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Extinction Rate
            </Typography>
            <Typography variant="h4" color="warning.main">
              {data.extinctionRate} per year
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current species extinction rate
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
                  <PetsIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Species Diversity"
                  secondary="Earth is home to an estimated 8.5 million species, with only about 1.2 million described and cataloged."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Endangered Species"
                  secondary="Over 40,000 species are currently listed as threatened with extinction on the IUCN Red List."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingDownIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Extinction Crisis"
                  secondary="Current extinction rates are 100-1000 times higher than natural background rates."
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 