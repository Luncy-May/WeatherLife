import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Set up CORS to allow frontend to communicate with the backend
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Endpoint to fetch location info based on lat/lng
app.get('/api/location', async (req, res) => {
    const { latitude, longitude } = req.query;

    // Input validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const APIkey = process.env.OPENCAGE_API_KEY; //  OpenCage API key from .env
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Location Data")
        console.log(data)
        if (data.status.code === 200) {
            res.json({ location: data.results[0].formatted });
        } else {
            res.status(500).json({ error: 'Failed to get location info' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching location data' });
    }
});


app.get('/api/weather', async (req, res) => {
    const { latitude, longitude } = req.query;

    // Input validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Weather Data")
        console.log(data)
        try {
            res.json({ location: data });
        } catch(error) {
            res.status(500).json({ error: 'Failed to get weather info' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
