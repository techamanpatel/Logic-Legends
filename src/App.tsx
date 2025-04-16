import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ClimateChange from './pages/ClimateChange';
import Biodiversity from './pages/Biodiversity';
import Pollution from './pages/Pollution';
import Ecosystems from './pages/Ecosystems';
import Impact from './pages/Impact';
import Reports from './components/Reports';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#2196F3',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/climate-change" element={<ClimateChange />} />
          <Route path="/biodiversity" element={<Biodiversity />} />
          <Route path="/pollution" element={<Pollution />} />
          <Route path="/ecosystems" element={<Ecosystems />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
