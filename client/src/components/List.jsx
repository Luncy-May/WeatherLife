import React, {useState} from 'react'

const List = ({}) => {
    const [list, setList] = useState({})
    async function getWeatherInfo(latitude, longitude) {
        try {
            const response = await fetch(`http://localhost:5002/api/getList?latitude=${latitude}&longitude=${longitude}`);
            const data = await response.json();
            console.log('weather')
            console.log(data)
            if (response.ok) {
                
            } else {
                seterrorWeatherMessage("Failed to get list info.");
            }
        } catch (error) {
            seterrorWeatherMessage("An error occurred while fetching list data.");
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default List
