import React from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaUserPlus, FaSearch } from 'react-icons/fa';
const NotAuthorizedPage = () => {
    return (
        <div>
            <div className='flex flex-col items-center justify-center space-y-5'>
                <div className='pt-5 space-y-5 text-4xl font-bold'>Please authorize the assistant to access your location for service.</div>
            </div>
        </div>
    )
}

export default NotAuthorizedPage
