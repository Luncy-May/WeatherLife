import React, { useState } from 'react'
import Drag from './Drag'
import List from './List'
const Plan = ({ WeatherInformation }) => { // plan information container
    const [list, setList] = useState([])
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
    const getList = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5002/api/getList?intensity=${intensity}&groupwork=${groupwork}&recovery=${recovery}&endurance=${endurance}`);
            const data = await response.json();
            console.log('list')
            console.log(data)
            if (response.ok) {
                setList(data.suggestedExercises)
            } else {
                seterrorWeatherMessage("Failed to get list info.");
            }
        } catch (error) {
            seterrorWeatherMessage("An error occurred while fetching list data.");
        }
    }
    return (
        <div className="p-5 space-y-5 font-bold items-center justify-center text-xl">
            <div>
                <p className='text-center'>Personalized Plans</p>
            </div>
            <div className='flex space-x-[2vw] '>
                <div className='min-w-[400px] border border-white shadow-md hover:shadow-2xl p-5'>
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
                        Recovery: {recovery}
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
                        <form onSubmit={getList}>
                            <button type="submit">See Suggestions </button>
                        </form>
                    </div>
                    <div>
                        <input type="checkbox" onChange={() => handleCheck}></input>
                        <span className='text-[20px] ml-1'>Auto-Suggestion On</span>
                    </div>
                </div>
                <List list={list} />
            </div>
        </div>
    )
}

export default Plan
