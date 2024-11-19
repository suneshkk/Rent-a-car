import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function DropDownUser() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-52 relative">
            <button
                className="flex  gap-4 justify-between items-center w-full px-4 py-2 btn-ghost rownded"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className='text-start font-semibold'>User Properties</h1>  <span className=' text-green-50' > {isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <div className="absolute top-8 left-6 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
                    <Link to={'/admin/user-list'} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 text-base font-semibold'>User List </Link>
                </div>
            )}
        </div>)
}

export default DropDownUser
