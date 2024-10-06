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

exercises = {
    "basketball": { "intensity": 80, "groupwork": 90, "recovery": 60, "endurance": 80 },
    "soccer": { "intensity": 85, "groupwork": 95, "recovery": 65, "endurance": 85 },
    "tennis": { "intensity": 70, "groupwork": 50, "recovery": 55, "endurance": 70 },
    "volleyball": { "intensity": 75, "groupwork": 85, "recovery": 60, "endurance": 75 },
    "baseball": { "intensity": 65, "groupwork": 70, "recovery": 55, "endurance": 65 },
    "bench press": { "intensity": 90, "groupwork": 20, "recovery": 40, "endurance": 60 },
    "squats": { "intensity": 85, "groupwork": 30, "recovery": 45, "endurance": 70 },
    "deadlifts": { "intensity": 95, "groupwork": 25, "recovery": 50, "endurance": 80 },
    "bicep curls": { "intensity": 60, "groupwork": 20, "recovery": 30, "endurance": 40 },
    "tricep dips": { "intensity": 70, "groupwork": 25, "recovery": 35, "endurance": 50 },
    "punching bag": { "intensity": 80, "groupwork": 40, "recovery": 50, "endurance": 70 },
    "sparring": { "intensity": 90, "groupwork": 60, "recovery": 55, "endurance": 80 },
    "jumping rope": { "intensity": 85, "groupwork": 30, "recovery": 45, "endurance": 75 },
    "shadowboxing": { "intensity": 70, "groupwork": 20, "recovery": 35, "endurance": 50 },
    "heavy bag": { "intensity": 95, "groupwork": 40, "recovery": 55, "endurance": 85 },
    "sketching": { "intensity": 20, "groupwork": 10, "recovery": 20, "endurance": 10 },
    "painting": { "intensity": 30, "groupwork": 15, "recovery": 25, "endurance": 20 },
    "drawing from life": { "intensity": 40, "groupwork": 20, "recovery": 30, "endurance": 30 },
    "cartooning": { "intensity": 50, "groupwork": 25, "recovery": 35, "endurance": 40 },
    "illustration": { "intensity": 60, "groupwork": 30, "recovery": 40, "endurance": 50 },
    "leisurely walking": { "intensity": 10, "groupwork": 5, "recovery": 10, "endurance": 10 },
    "brisk walking": { "intensity": 30, "groupwork": 15, "recovery": 20, "endurance": 25 },
    "hiking": { "intensity": 50, "groupwork": 25, "recovery": 30, "endurance": 40 },
    "power walking": { "intensity": 60, "groupwork": 30, "recovery": 35, "endurance": 50 },
    "walking uphill": { "intensity": 70, "groupwork": 35, "recovery": 40, "endurance": 60 },
    "jogging": { "intensity": 50, "groupwork": 20, "recovery": 30, "endurance": 40 },
    "running sprints": { "intensity": 80, "groupwork": 30, "recovery": 40, "endurance": 60 },
    "long-distance running": { "intensity": 90, "groupwork": 40, "recovery": 50, "endurance": 80 },
    "trail running": { "intensity": 85, "groupwork": 35, "recovery": 45, "endurance": 75 },
    "running intervals": { "intensity": 95, "groupwork": 45, "recovery": 55, "endurance": 90 },
    "yoga": { "intensity": 30, "groupwork": 20, "recovery": 25, "endurance": 20 },
    "pilates": { "intensity": 40, "groupwork": 25, "recovery": 30, "endurance": 30 },
    "swimming": { "intensity": 60, "groupwork": 30, "recovery": 35, "endurance": 50 },
    "cycling": { "intensity": 70, "groupwork": 35, "recovery": 40, "endurance": 60 },
    "dancing": { "intensity": 80, "groupwork": 40, "recovery": 45, "endurance": 70 },
    "jumping jacks": { "intensity": 85, "groupwork": 30, "recovery": 40, "endurance": 60 },
    "burpees": { "intensity": 95, "groupwork": 40, "recovery": 50, "endurance": 80 },
    "mountain climbing": { "intensity": 90, "groupwork": 35, "recovery": 45, "endurance": 75 },
    "rock climbing": { "intensity": 85, "groupwork": 30, "recovery": 40, "endurance": 65 },
    "skateboarding": { "intensity": 80, "groupwork": 25, "recovery": 35, "endurance": 55 },
    "surfing": { "intensity": 85, "groupwork": 30, "recovery": 40, "endurance": 65 },
    "weightlifting": { "intensity": 90, "groupwork": 25, "recovery": 40, "endurance": 60 },
    "zumba": { "intensity": 80, "groupwork": 35, "recovery": 40, "endurance": 60 },
    "kickboxing": { "intensity": 90, "groupwork": 40, "recovery": 45, "endurance": 75 },
    "taekwondo": { "intensity": 85, "groupwork": 35, "recovery": 40, "endurance": 65 },
    "karate": { "intensity": 90, "groupwork": 35, "recovery": 45, "endurance": 70 },
    "judo": { "intensity": 85, "groupwork": 35, "recovery": 40, "endurance": 65 },
    "fencing": { "intensity": 80, "groupwork": 30, "recovery": 35, "endurance": 55 },
    "golf": { "intensity": 40, "groupwork": 20, "recovery": 25, "endurance": 30 },
    "archery": { "intensity": 50, "groupwork": 20, "recovery": 25, "endurance": 30 },
    "badminton": { "intensity": 60, "groupwork": 30, "recovery": 30, "endurance": 40 },
    "table tennis": { "intensity": 70, "groupwork": 35, "recovery": 35, "endurance": 50 },
    "racquetball": { "intensity": 80, "groupwork": 35, "recovery": 40, "endurance": 60 },
    "squash": { "intensity": 85, "groupwork": 35, "recovery": 40, "endurance": 65 }
}

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
        res.status(500).json({ error: 'An error occurred while sending location data' });
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
        } catch (error) {
            res.status(500).json({ error: 'Failed to get weather info' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while sending weather data' });
    }
});

app.get('/api/getPlan', async (req, res) => {
    const { intensity, groupwork, recovery, endurance } = req.query;

    // Input validation
    if (!intensity || !groupwork || !endurance || !recovery) {
        return res.status(400).json({ error: 'information is incompleted' });
    }


    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Weather Data")
        console.log(data)
        try {
            res.json({ location: data });
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate a suggested plan info' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching plan data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
