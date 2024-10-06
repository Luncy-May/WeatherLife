import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { IconContext } from 'react-icons';
const Weather = () => {
    const [location, setLocation] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    async function getLocationInfo(latitude, longitude) {
        try {
            const response = await fetch(`http://localhost:5002/api/location?latitude=${latitude}&longitude=${longitude}`);
            const data = await response.json();

            if (response.ok) {
                setLocation(data.location);
            } else {
                setErrorMessage(data.error || "Failed to get location info.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while fetching location data.");
        }
    }
    async function getWeatherInfo(latitude, longitude) {
        try {
            const response = await fetch(`http://localhost:5002/api/weather?latitude=${latitude}&longitude=${longitude}`);
            const data = await response.json();

            if (response.ok) {
                setLocation(data.location);
            } else {
                setErrorMessage(data.error || "Failed to get location info.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while fetching location data.");
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
        setErrorMessage("Failed to get your location.");
    }

    //   useEffect(() => {
    //     if (navigator.geolocation) {
    //       navigator.permissions
    //         .query({ name: "geolocation" })
    //         .then((result) => {
    //           if (result.state === "granted" || result.state === "prompt") {
    //             navigator.geolocation.getCurrentPosition(success, errors, options);
    //           } else if (result.state === "denied") {
    //             setErrorMessage("Location access denied. Please enable location.");
    //           }
    //         });
    //     } else {
    //       setErrorMessage("Geolocation is not supported by your browser.");
    //     }
    //   }, []);

    function onSubmit(event) {
        event.preventDefault();
        setIsLoggedIn(false);
    }

    return (
        <div>
            <div className="p-5 space-x-4 font-bold flex items-center justify-center">
                <p className="text-4xl">How is the weather today? </p>
                <div className="ml-8 cursor-pointer">
                    <FaIcons.FaSync className="text-white" onClick={getWeatherInfo} />
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center justify-center">
                    {location ? (
                        <div className="text-2xl">Current Location: {location}</div>
                    ) : (
                        <div className="text-red-500 text-xl pt-5">
                            {errorMessage || "Getting location..."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Weather;
