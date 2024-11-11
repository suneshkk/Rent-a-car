import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function DropDownBt({ car }) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-52 relative">
            <button
                className="flex  gap-4 justify-between items-center w-full px-4 py-2 btn-ghost rownded"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className='text-start font-semibold'>Car Properties</h1>  <span className=' text-green-50' > {isOpen ? "▲" : "▼"}</span>
                <h1 className='text-start font-semibold'>Car Controller </h1>  <span className=' text-green-50' > {isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <div className="absolute top-8 left-6 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
                    <Link to={"/admin/create-car"} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 text-base font-semibold'>Create Car </Link>
                    <Link to={"/admin/car-list"} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 text-base font-semibold'>Car List</Link>
                </div>
            )}
        </div>)
}

export default DropDownBt
