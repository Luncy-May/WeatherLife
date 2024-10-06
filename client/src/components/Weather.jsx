import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { IconContext } from 'react-icons';
const Weather = () => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [temperature, setTemperature] = useState(null)
    const [windSpeed, setWindSpeed] = useState(null)
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
                setWeather("timezone: " + data.location.timezone + " , current time: " + data.location.current_weather.time);
                setTemperature("temperature: " + data.location.current_weather.temperature + " (" + data.location.current_weather_units.temperature + ")");
                setWindSpeed("wind speed: " + data.location.current_weather.windspeed + " (" + data.location.current_weather_units.windspeed + ")");
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
            <div className="p-5 space-x-4 font-bold flex items-center justify-center">
                <p className="text-4xl">How is the weather today? </p>
                <div className="ml-8 cursor-pointer">
                    <FaIcons.FaSync className="text-white" onClick={getWeatherInfo} />
                </div>
            </div>
            <div className="p-5 space-y-5 font-bold items-center justify-center">
                <div>
                    {location ? (
                        <div className="text-2xl">
                            <div>Current Location: </div>
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
                        <div className="text-2xl">
                            <div >Current Weather: </div>
                            <div>{weather}</div>
                            <div>{temperature}</div>
                            <div>{windSpeed}</div>
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
