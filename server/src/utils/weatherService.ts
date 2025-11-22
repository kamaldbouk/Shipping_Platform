import axios from "axios";

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  city: string;
  country: string;
}

export const getWeatherByAddress = async (
  address: string
): Promise<WeatherData | null> => {
  try {
    console.log(`Fetching weather for address: ${address}`);

    const cityName = address.split(",")[0].trim();
    console.log(`Geocoding city: ${cityName}`);

    const geoResponse = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
      params: {
        name: cityName,
        count: 1,
        language: "en",
        format: "json",
      },
    });

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      console.log(`Could not find location for city: ${cityName}`);
      return null;
    }

    const location = geoResponse.data.results[0];
    const { latitude, longitude, name, country } = location;
    console.log(
      `Found location: ${name}, ${country} (lat=${latitude}, lon=${longitude})`
    );

    const weatherResponse = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude,
          longitude,
          current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
          temperature_unit: "celsius",
          wind_speed_unit: "kmh",
        },
      }
    );

    const current = weatherResponse.data.current;
    const weatherCode = current.weather_code;

    const weatherDescription = getWeatherDescription(weatherCode);

    const result: WeatherData = {
      temperature: Math.round(current.temperature_2m),
      description: weatherDescription,
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
      city: name,
      country,
    };

    console.log(`Weather data retrieved:`, result);
    return result;
  } catch (error: any) {
    console.error("Weather service error:", error.response?.status || error.message, error.response?.data || "");
    return null;
  }
};

function getWeatherDescription(code: number): string {
  const weatherCodes: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherCodes[code] || "Unknown";
}
