import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
const Weather = () => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [temperature, setTemperature] = useState(null)
    const [windSpeed, setWindSpeed] = useState(null)
    const [weatherCondition, setWeatherCondition]= useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [errorLocationMessage, seterrorLocationMessage] = useState(null);
    const [errorWeatherMessage, seterrorWeatherMessage] = useState(null);


    async function getLocationInfo(latitude, longitude) {
        try {
            const response = await fetch(`http://localhost:5002/api/location?latitude=${latitude}&longitude=${longitude}`);
            const data = await response.json();

            if (response.ok) {
                setLocation(data.location);
            } else {
                seterrorLocationMessage(data.error || "Failed to get location info.");
            }
        } catch (error) {
            seterrorLocationMessage("An error occurred while fetching location data.");
        }
    }


    async function getWeatherInfo(latitude, longitude) {
        try {
            const response = await fetch(`http://localhost:5002/api/weather?latitude=${latitude}&longitude=${longitude}`);
            const data = await response.json();
            console.log('weather')
            console.log(data)
            if (response.ok) {
                setWeather("timezone: " + data.weather.timezone + " , current time: " + data.weather.current_weather.time);
                setTemperature("temperature: " + data.weather.current_weather.temperature + " (" + data.weather.current_weather_units.temperature + ")");
                setWindSpeed("wind speed: " + data.weather.current_weather.windspeed + " (" + data.weather.current_weather_units.windspeed + ")");
                setWeatherCondition(data.condition)
            } else {
                seterrorWeatherMessage("Failed to get Weather info.");
            }
        } catch (error) {
            seterrorWeatherMessage("An error occurred while fetching weather data.");
        }
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        const crd = pos.coords;
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getLocationInfo(crd.latitude, crd.longitude);
        getWeatherInfo(crd.latitude, crd.longitude)
    }

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        seterrorLocationMessage("Failed to get your location.");
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((result) => {
                    if (result.state === "granted" || result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        seterrorLocationMessage("Location access denied. Please enable location.");
                    }
                });
        } else {
            seterrorLocationMessage("Geolocation is not supported by your browser.");
        }
    }, []);

    function onSubmit(event) {
        event.preventDefault();
        setIsLoggedIn(false);
    }

    return (
        <div className="font-inter">
            <div className="p-5 space-y-5 font-bold items-center justify-center text-xl">
                <div>
                    {location ? (
                        <div className="space-y-3">
                            <FaIcons.FaMapMarker />
                            <div>{location}</div>
                        </div>
                    ) : (
                        <div className="text-red-500 text-xl pt-5">
                            {errorLocationMessage || "Getting location..."}
                        </div>
                    )}
                </div>
                <div>
                    {weather ? (
                        <div>
                            <FaIcons.FaCloudSun />
                            <div>{weather}</div>
                            <div>{temperature}</div>
                            <div>{windSpeed}</div>
                            <div className="text-4xl text-center animate-pulse duration-500">{weatherCondition} </div>
                        </div>
                    ) : (
                        <div className="text-red-500 text-xl pt-5">
                            {errorWeatherMessage || "Getting weather..."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Weather;
