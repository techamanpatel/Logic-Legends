import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, CircularProgress, Chip, Alert } from '@mui/material';
import { Download as DownloadIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { getReports, downloadReport } from '../services/reportService';

const ReportCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ReportIcon = styled(DescriptionIcon)(({ theme }) => ({
  fontSize: '2rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

interface Report {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  date: string;
  size: string;
  type: 'pdf' | 'doc' | 'docx';
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        setError('Failed to load reports. Please try again later.');
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDownload = async (reportId: string) => {
    try {
      setDownloading(reportId);
      await downloadReport(reportId);
    } catch (err) {
      setError('Failed to download report. Please try again later.');
      console.error('Error downloading report:', err);
    } finally {
      setDownloading(null);
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'error';
      case 'doc':
      case 'docx':
        return 'primary';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }} id="reports-section">
      <Typography variant="h4" gutterBottom align="center">
        Reports & Publications
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
        Download the latest scientific assessments and reports
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {reports.map((report) => (
          <Grid item xs={12} md={4} key={report.id}>
            <ReportCard>
              <Box>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                  <ReportIcon />
                  <Chip
                    label={report.type.toUpperCase()}
                    color={getFileTypeColor(report.type)}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {report.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {report.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    Published: {report.date}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Size: {report.size}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={downloading === report.id ? <CircularProgress size={20} /> : <DownloadIcon />}
                onClick={() => handleDownload(report.id)}
                disabled={downloading === report.id}
                sx={{ mt: 2 }}
              >
                {downloading === report.id ? 'Downloading...' : 'Download Report'}
              </Button>
            </ReportCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reports; 