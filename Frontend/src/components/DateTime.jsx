import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

function DateTime() {
    const [pickupDate, setPickupDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [location, setLocation] = useState('');

    return (
        <body className="bg-white  p-4 flex items-center justify-between flex-col">

            {/* Pickup and Return Location */}
            <div className="flex justify-between content-center gap-7">

                <div className='flex flex-col'>
                    <label className="block text-gray-700">Pick-up </label>
                    <input
                        type="text"
                        placeholder="Airport, city or address"
                        className="input input-bordered "
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                </div>
                <div className='flex flex-col'>
                    <label className="block text-gray-700">Return</label>
                    <input
                        type="text"
                        placeholder="Airport, city or address"
                        className="input input-bordered "
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                </div>


                {/* Pickup Date */}

                <div className='flex flex-col'>
                    <label className="block text-gray-700">Pick-up date</label>
                    <DatePicker
                        selected={pickupDate}
                        onChange={(date) => setPickupDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="input input-bordered"
                    />
                </div>

                {/* Return Date */}
                <div className='flex flex-col'>
                    <label className="block text-gray-700">Return date</label>
                    <DatePicker
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="input input-bordered"
                    />
                </div>
                <div className='flex flex-col pt-6'>
                </div>

            </div>

        </body>

    )
}

export default DateTime
