import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Set up CORS to allow frontend to communicate with the backend
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const exercises = {
    "basketball": { "intensity": 80, "groupwork": 90, "recovery": 60, "endurance": 80 , "weatherCoefficient": 1},
    "soccer": { "intensity": 85, "groupwork": 95, "recovery": 65, "endurance": 85 , "weatherCoefficient": 1},
    "tennis": { "intensity": 70, "groupwork": 50, "recovery": 55, "endurance": 70 , "weatherCoefficient": 1},
    "volleyball": { "intensity": 75, "groupwork": 85, "recovery": 60, "endurance": 75 , "weatherCoefficient": 1},
    "baseball": { "intensity": 65, "groupwork": 70, "recovery": 55, "endurance": 65 , "weatherCoefficient": 1},
    "bench press": { "intensity": 90, "groupwork": 20, "recovery": 40, "endurance": 60 , "weatherCoefficient": 1},
    "squats": { "intensity": 85, "groupwork": 30, "recovery": 45, "endurance": 70 , "weatherCoefficient": 1},
    "deadlifts": { "intensity": 95, "groupwork": 25, "recovery": 50, "endurance": 80 , "weatherCoefficient": 1},
    "bicep curls": { "intensity": 60, "groupwork": 20, "recovery": 30, "endurance": 40 , "weatherCoefficient": 1},
    "tricep dips": { "intensity": 70, "groupwork": 25, "recovery": 35, "endurance": 50 , "weatherCoefficient": 1},
    "punching bag": { "intensity": 80, "groupwork": 40, "recovery": 50, "endurance": 70 , "weatherCoefficient": 1},
    "sparring": { "intensity": 90, "groupwork": 60, "recovery": 55, "endurance": 80 , "weatherCoefficient": 1},
    "jumping rope": { "intensity": 85, "groupwork": 30, "recovery": 45, "endurance": 75 , "weatherCoefficient": 1},
    "shadowboxing": { "intensity": 70, "groupwork": 20, "recovery": 35, "endurance": 50 , "weatherCoefficient": 1},
    "heavy bag": { "intensity": 95, "groupwork": 40, "recovery": 55, "endurance": 85 , "weatherCoefficient": 1},
    "sketching": { "intensity": 20, "groupwork": 10, "recovery": 20, "endurance": 10 , "weatherCoefficient": 1},
    "painting": { "intensity": 30, "groupwork": 15, "recovery": 25, "endurance": 20 , "weatherCoefficient": 1},
    "drawing from life": { "intensity": 40, "groupwork": 20, "recovery": 30, "endurance": 30 , "weatherCoefficient": 1},
    "cartooning": { "intensity": 50, "groupwork": 25, "recovery": 35, "endurance": 40 , "weatherCoefficient": 1},
    "illustration": { "intensity": 60, "groupwork": 30, "recovery": 40, "endurance": 50 , "weatherCoefficient": 1},
    "leisurely walking": { "intensity": 10, "groupwork": 5, "recovery": 10, "endurance": 10 , "weatherCoefficient": 1},
    "brisk walking": { "intensity": 30, "groupwork": 15, "recovery": 20, "endurance": 25 , "weatherCoefficient": 1},
    "hiking": { "intensity": 50, "groupwork": 25, "recovery": 30, "endurance": 40 , "weatherCoefficient": 1},
    "power walking": { "intensity": 60, "groupwork": 30, "recovery": 35, "endurance": 50 , "weatherCoefficient": 1},
    "walking uphill": { "intensity": 70, "groupwork": 35, "recovery": 40, "endurance": 60 , "weatherCoefficient": 1},
    "jogging": { "intensity": 50, "groupwork": 20, "recovery": 30, "endurance": 40 , "weatherCoefficient": 1},
    "running sprints": { "intensity": 80, "groupwork": 30, "recovery": 40, "endurance": 60 , "weatherCoefficient": 1},
    "long-distance running": { "intensity": 90, "groupwork": 40, "recovery": 50, "endurance": 80 , "weatherCoefficient": 1},
    "trail running": { "intensity": 85, "groupwork": 35, "recovery": 45, "endurance": 75 , "weatherCoefficient": 1},
    "running intervals": { "intensity": 95, "groupwork": 45, "recovery": 55, "endurance": 90 , "weatherCoefficient": 1},
    "yoga": { "intensity": 30, "groupwork": 20, "recovery": 25, "endurance": 20 , "weatherCoefficient": 1},
    "pilates": { "intensity": 40, "groupwork": 25, "recovery": 30, "endurance": 30 , "weatherCoefficient": 1},
    "swimming": { "intensity": 60, "groupwork": 30, "recovery": 35, "endurance": 50 , "weatherCoefficient": 1},
    "cycling": { "intensity": 70, "groupwork": 35, "recovery": 40, "endurance": 60 , "weatherCoefficient": 1},
    "dancing": { "intensity": 80, "groupwork": 40, "recovery": 45, "endurance": 70 , "weatherCoefficient": 1},
    "jumping jacks": { "intensity": 85, "groupwork": 30, "recovery": 40, "endurance": 60 , "weatherCoefficient": 1},
    "burpees": { "intensity": 95, "groupwork": 40, "recovery": 50, "endurance": 80 , "weatherCoefficient": 1},
    "mountain climbing": { "intensity": 90, "groupwork": 35, "recovery": 45, "endurance": 75 , "weatherCoefficient": 1},
    "rock climbing": { "intensity": 85, "groupwork": 30, "recovery": 40, "endurance": 65 , "weatherCoefficient": 1},
    "skateboarding": { "intensity": 80, "groupwork": 25, "recovery": 35, "endurance": 55 , "weatherCoefficient": 1},
    "surfing": { "intensity": 85, "groupwork": 30, "recovery": 40, "endurance": 65 , "weatherCoefficient": 1},
    "weightlifting": { "intensity": 90, "groupwork": 25, "recovery": 40, "endurance": 60 , "weatherCoefficient": 1},
    "zumba": { "intensity": 80, "groupwork": 35, "recovery": 40, "endurance": 60 , "weatherCoefficient": 1},
    "kickboxing": { "intensity": 90, "groupwork": 40, "recovery": 45, "endurance": 75 , "weatherCoefficient": 1},
    "taekwondo": { "intensity": 85, "groupwork": 35, "recovery": 40, "endurance": 65 , "weatherCoefficient": 1},
    "karate": { "intensity": 90, "groupwork": 35, "recovery": 45, "endurance": 70 , "weatherCoefficient": 1},
    "judo": { "intensity": 85, "groupwork": 35, "recovery": 40, "endurance": 65 , "weatherCoefficient": 1},
    "fencing": { "intensity": 80, "groupwork": 30, "recovery": 35, "endurance": 55 , "weatherCoefficient": 1},
    "golf": { "intensity": 40, "groupwork": 20, "recovery": 25, "endurance": 30 , "weatherCoefficient": 1},
    "archery": { "intensity": 50, "groupwork": 20, "recovery": 25, "endurance": 30 , "weatherCoefficient": 1},
    "badminton": { "intensity": 60, "groupwork": 30, "recovery": 30, "endurance": 40 , "weatherCoefficient": 1},
    "table tennis": { "intensity": 70, "groupwork": 35, "recovery": 35, "endurance": 50 , "weatherCoefficient": 1},
    "racquetball": { "intensity": 80, "groupwork": 35, "recovery": 40, "endurance": 60 , "weatherCoefficient": 1},
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
        const currentWeather = data.current_weather;
        const weatherCondition = getWeatherCondition(currentWeather);

        try {
            res.json({ weather: data, condition: weatherCondition});
        } catch (error) {
            res.status(500).json({ error: 'Failed to get weather info' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while sending weather data' });
    }
});

app.get('/api/getList', async (req, res) => {
    const { intensity, groupwork, recovery, endurance } = req.query;

    // Input validation
    if (!intensity || !groupwork || !endurance || !recovery) {
        return res.status(400).json({ error: 'information is incompleted' });
    }

    const sseExercises = Object.keys(exercises).map(exercise => {
        const exerciseData = exercises[exercise];
        const sse = Math.pow(exerciseData.intensity - intensity, 2) +
                    Math.pow(exerciseData.groupwork - groupwork, 2) +
                    Math.pow(exerciseData.recovery - recovery, 2) +
                    Math.pow(exerciseData.endurance - endurance, 2);
        return { exercise, sse };
    });

    sseExercises.sort((a, b) => a.sse - b.sse);
    const suggestedExercises = sseExercises.slice(0, 5).map(exercise => exercise.exercise);
    try {
        res.json({ suggestedExercises: suggestedExercises });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate a suggested plan info' });
    }
});

function getWeatherCondition(currentWeather) {
    const weatherCode = currentWeather.weathercode;
    switch (weatherCode) {
        case 0:
            return 'Clear sky';
        case 1:
        case 2:
        case 3:
            return 'Mainly clear';
        case 45:
        case 48:
            return 'Fog';
        case 51:
        case 53:
        case 55:
            return 'Drizzle';
        case 56:
        case 57:
            return 'Freezing drizzle';
        case 61:
        case 63:
        case 65:
            return 'Rain';
        case 66:
        case 67:
            return 'Freezing rain';
        case 71:
        case 73:
        case 75:
            return 'Snow';
        case 77:
            return 'Snow grains';
        case 80:
        case 81:
        case 82:
            return 'Rain showers';
        case 83:
        case 84:
        case 85:
        case 86:
            return 'Thunderstorm';
        case 95:
            return 'Thunderstorm with heavy rain';
        case 96:
            return 'Thunderstorm with hail';
        case 99:
            return 'Thunderstorm with heavy hail';
        default:
            return 'Unknown';
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
