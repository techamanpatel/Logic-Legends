import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';

interface ImpactCardProps {
  title: string;
  value: number;
  maxValue: number;
  unit: string;
  description: string;
  color: string;
}

export default function ImpactCard({
  title,
  value,
  maxValue,
  unit,
  description,
  color,
}: ImpactCardProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h4" component="div" sx={{ color }}>
            {value}
          </Typography>
          <Typography variant="body1" sx={{ ml: 1 }}>
            {unit}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
              },
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
} 