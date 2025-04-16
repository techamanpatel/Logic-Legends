import axios from 'axios';

// You should replace this with your actual OpenWeatherMap API key
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  aqi: number;
  humidity: number;
  windSpeed: number;
  description: string;
  location: string;
}

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Fetch current weather data
    const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', // Use metric units
      },
    });

    // Fetch air quality data
    const airQualityResponse = await axios.get(`${BASE_URL}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });

    const weather = weatherResponse.data;
    const airQuality = airQualityResponse.data;

    return {
      temperature: Math.round(weather.main.temp),
      aqi: airQuality.list[0].main.aqi * 20, // Convert 1-5 scale to 0-500
      humidity: weather.main.humidity,
      windSpeed: weather.wind.speed,
      description: weather.weather[0].description,
      location: weather.name,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

// Mock data for development/testing
export const getMockWeatherData = (lat: number, lon: number): WeatherData => {
  return {
    temperature: Math.round(20 + Math.random() * 10),
    aqi: Math.round(30 + Math.random() * 200),
    humidity: Math.round(40 + Math.random() * 40),
    windSpeed: Math.round(2 + Math.random() * 8),
    description: 'Partly cloudy',
    location: 'Sample Location',
  };
}; 