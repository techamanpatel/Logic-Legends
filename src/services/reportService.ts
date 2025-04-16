import axios from 'axios';

export interface Report {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  date: string;
  size: string;
  type: 'pdf' | 'doc' | 'docx';
}

// Mock reports data with real PDF paths
const mockReports: Report[] = [
  {
    id: '1',
    title: 'Planetary Health Check 2024',
    description: 'A comprehensive assessment of global environmental health indicators and trends',
    downloadUrl: '/reports/pdfs/planetary-health-check-2024.pdf',
    date: '2024-01-15',
    size: '2.5 MB',
    type: 'pdf'
  },
  {
    id: '2',
    title: 'Climate Change Impact Report',
    description: 'Detailed analysis of climate change effects on global ecosystems',
    downloadUrl: '/reports/pdfs/climate-change-2024.pdf',
    date: '2024-02-01',
    size: '3.1 MB',
    type: 'pdf'
  },
  {
    id: '3',
    title: 'Biodiversity Assessment',
    description: 'Current state of global biodiversity and conservation efforts',
    downloadUrl: '/reports/pdfs/biodiversity-2024.pdf',
    date: '2024-02-15',
    size: '1.8 MB',
    type: 'pdf'
  },
  {
    id: '4',
    title: 'Ocean Health Index',
    description: 'Annual report on ocean health indicators and marine ecosystem status',
    downloadUrl: '/reports/pdfs/ocean-health-2024.pdf',
    date: '2024-03-01',
    size: '4.2 MB',
    type: 'pdf'
  },
  {
    id: '5',
    title: 'Air Quality Report',
    description: 'Global air quality assessment and pollution control measures',
    downloadUrl: '/reports/pdfs/air-quality-2024.pdf',
    date: '2024-03-15',
    size: '2.1 MB',
    type: 'pdf'
  },
  {
    id: '6',
    title: 'Sustainable Development Goals Progress',
    description: 'Progress report on environmental sustainability goals',
    downloadUrl: '/reports/pdfs/sdg-progress-2024.pdf',
    date: '2024-04-01',
    size: '3.5 MB',
    type: 'pdf'
  }
];

export const getReports = async (): Promise<Report[]> => {
  try {
    // In a real application, this would be an API call
    // For now, we'll return the mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockReports);
      }, 500); // Reduced delay for better UX
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw new Error('Failed to fetch reports');
  }
};

export const downloadReport = async (reportId: string): Promise<void> => {
  const report = mockReports.find(r => r.id === reportId);
  if (!report) {
    throw new Error('Report not found');
  }

  try {
    // Attempt to download the actual PDF file
    const response = await axios.get(report.downloadUrl, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    // Create a blob from the PDF data
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${report.title}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error downloading report:', error);
    // Fallback to creating a simple PDF if the file doesn't exist
    const content = `Sample ${report.title}\n\n${report.description}\n\nDate: ${report.date}\nSize: ${report.size}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${report.title}.txt`);
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
};

// Function to handle the "Learn More" action
export const handleLearnMore = (): void => {
  // Scroll to the reports section
  const reportsSection = document.getElementById('reports-section');
  if (reportsSection) {
    reportsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Function to handle the "Download Report" action from the home page
export const handleDownloadLatestReport = async (): Promise<void> => {
  try {
    // Get the most recent report
    const reports = await getReports();
    const latestReport = reports[0]; // Assuming reports are sorted by date
    await downloadReport(latestReport.id);
  } catch (error) {
    console.error('Error downloading latest report:', error);
    throw new Error('Failed to download latest report');
  }
}; 