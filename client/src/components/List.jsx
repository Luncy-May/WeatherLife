import React, { useState } from 'react'

const List = ({list}) => {    
    return (
        <div>
            <div className='border border-white shadow-md hover:shadow-2xl p-5 min-w-[400px] min-h-[300px]'>
                <p>Top 5 Recommended Activities</p>
                <ul className='items-start justify-center'>
                    {list.map((exercise, key) => (
                        <li key={key} className="pt-2">{key + 1}. {exercise}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default List
