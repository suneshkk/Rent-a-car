import React from 'react'
import moment from 'moment'

function BoookHistory({ booking }) {

    console.log("booking", booking)
    const toDate = moment(booking?.toDate).format('MMMM Do YYYY, h:mm:ss a');
    const fromDate = moment(booking?.fromDate).format('MMMM Do YYYY, h:mm:ss a')
    return (
        // <div className="card lg:card-side bg-slate-400 shadow-xl md:size-128 mb-8">
       

            <div className="card p-7 bg-white shadow-md rounded-lg max-w-sm m-1">
                <h2 className="underline text-xl font-serif font-bold text-sky-900 mb-1 text-center">
                    Booking Details
                </h2>

                <figure>
                    <img
                        src={booking?.carId?.image}
                        alt="car" className='sm:w-40 rounded-md' />
                </figure>

                <ul className="">
                    <li className=' flex justify-between'>
                        <span className='capitalize text-sm font-bold'>user :</span>
                        <span className='capitalize text-sm font-medium'>{booking?.userId?.name}</span>
                    </li>
                    <li className=' flex justify-between'>
                        <span className='capitalize text-sm font-bold'>Phone :</span>
                        <span className='capitalize text-sm font-medium'>{booking?.userId?.phone}</span>
                    </li>
                    <li className='flex justify-between'>
                        <span className='capitalize text-sm font-bold'>email :</span>
                        <span className='capitalize text-sm font-medium'>{booking?.userId?.email}</span>
                    </li>

                    <li className="font-body flex justify-between">
                        <span className="font-bold">Car name:</span>
                        <span>{booking?.carId?.carName}</span>
                    </li>

                    <li className="font-body flex justify-between">
                        <span className="font-bold">Total Amount:</span>
                        <span>{booking?.totalAmount}</span>
                    </li>
                    <li className="font-body flex justify-between">
                        <span className="font-bold">Total Hours:</span>
                        <span>{booking?.totalHours}</span>
                    </li>
                    <li className="font-body flex justify-between">
                        <span className="font-bold">Status:</span>
                        <span className='text-green-700'>{booking?.status}</span>
                    </li>
                    <li className="font-body flex justify-between">
                        <span className="font-bold">Client License:</span>
                        <span>{booking?.dLicence}</span>
                    </li>
                    <li className="font-body flex justify-between">
                        <span className="font-bold">From Date:</span>
                        <span>{fromDate}</span>
                    </li>
                    <li className="font-body flex justify-between">
                        <span className="font-bold">To Date:</span>
                        <span>{toDate}</span>
                    </li>
                </ul>
            </div>
        // </div>
    )
}

export default BoookHistory
