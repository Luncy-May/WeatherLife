import React, { useState } from 'react'
import Drag from './Drag'

const Plan = ({ WeatherInformation }) => { // plan information container
    const [intensity, setIntensity] = useState(0)
    const intensitySlide = (newValue) => {
        setIntensity(newValue)
    }

    const [groupwork, setGroupWork] = useState(0)
    const groupWorkSlide = (newValue) => {
        setGroupWork(newValue)
    }

    const [recovery, setRecovery] = useState(0)
    const recoverySlide = (newValue) => {
        setRecovery(newValue)
    }
    const [endurance, setEndurance] = useState(0)
    const enduranceSlide = (newValue) => {
        setEndurance(newValue)
    }
    async function generateResult() {
        try {
            const response = await fetch(`http://localhost:5002/api/getPlan?latitude=${latitude}&longitude=${longitude}`);
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
    return (
        <div className="p-5 space-y-5 font-bold items-center justify-center text-xl">
            <div>
            <p className='text-center'>Personalized Plans</p>
            </div>
            <div className='flex space-x-[2vw] '>
                <div className='min-w-[400px] border border-white p-5'>
                    <div>
                        Intensity: {intensity}
                        <div>
                            <Drag value={intensity} handleSlide={intensitySlide} />
                        </div>
                    </div>
                    <div >
                        Groupwork: {groupwork}
                        <div>
                            <Drag value={groupwork} handleSlide={groupWorkSlide} />
                        </div>
                    </div>
                    <div >
                        recovery: {recovery}
                        <div>
                            <Drag value={recovery} handleSlide={recoverySlide} />
                        </div>
                    </div>
                    <div >
                        Endurance: {endurance}
                        <div>
                            <Drag value={endurance} handleSlide={enduranceSlide} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='p-2 border border-white shadow-md hover:shadow-lg text-center mb-2'>
                    <button onClick={() => generateResult}>See Suggestions </button>
                    </div>
                    <div>
                        <input type = "checkbox" onChange = {() => handleCheck}></input> 
                        <span className='text-[20px] ml-1'>Auto-Suggestion On</span>
                    </div>
                </div>
                <div className='border border-white shadow-md hover:shadow-lg p-5 min-w-[400px]'>
                    <p> Recommended Activities</p>
                </div>
            </div>
        </div>
    )
}

export default Plan
