import axios from 'axios';
//http://api.weatherapi.com/v1/current.json?key=d8b1b55bf40247eda85162143220103&q=London&aqi=no
const URL = 'http://api.weatherapi.com/v1/current.json?';
const API_KEY = 'd8b1b55bf40247eda85162143220103';

export const fetchWeather = async (query) => {
    const data = await axios.get(URL, {
        params: {
            q: query,
            key: API_KEY,
            
        }
    });

    return data;
}