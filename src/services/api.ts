import axios from 'axios';

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NOAA_API_KEY = import.meta.env.VITE_NOAA_API_KEY;

const api = axios.create({
  baseURL: 'https://api.nasa.gov',
});

export interface EnvironmentalData {
  temperature: number;
  co2Level: number;
  forestCover: number;
  biodiversityIndex: number;
  airQuality: number;
}

export const getEnvironmentalData = async (): Promise<EnvironmentalData> => {
  try {
    // In a real application, we would make actual API calls here
    // For now, we'll return mock data
    return {
      temperature: 1.2,
      co2Level: 415,
      forestCover: 31,
      biodiversityIndex: 0.68,
      airQuality: 75,
    };
  } catch (error) {
    console.error('Error fetching environmental data:', error);
    throw error;
  }
};

export const getClimateData = async () => {
  try {
    // Example NASA API call for climate data
    const response = await api.get('/planetary/earth/imagery', {
      params: {
        lat: 0,
        lon: 0,
        date: new Date().toISOString().split('T')[0],
        api_key: NASA_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching climate data:', error);
    throw error;
  }
};

export const getBiodiversityData = async () => {
  try {
    // Example API call for biodiversity data
    // In a real application, this would call a biodiversity API
    return {
      speciesCount: 8500000,
      endangeredSpecies: 40000,
      extinctionRate: 1000,
    };
  } catch (error) {
    console.error('Error fetching biodiversity data:', error);
    throw error;
  }
};

export const getPollutionData = async () => {
  try {
    // Example API call for pollution data
    // In a real application, this would call a pollution monitoring API
    return {
      airQualityIndex: 75,
      waterQualityIndex: 82,
      soilQualityIndex: 78,
    };
  } catch (error) {
    console.error('Error fetching pollution data:', error);
    throw error;
  }
};

export const getEcosystemData = async () => {
  try {
    // Example API call for ecosystem data
    // In a real application, this would call an ecosystem monitoring API
    return {
      forestCover: 31,
      oceanHealth: 70,
      wetlandArea: 12.1,
    };
  } catch (error) {
    console.error('Error fetching ecosystem data:', error);
    throw error;
  }
}; 