import React from 'react'
import moment from 'moment'

function BoookHistory({ booking }) {

    // console.log("booking", booking)
    const toDate = moment(booking?.toDate).format('MMMM Do YYYY, h:mm:ss a');
    const fromDate = moment(booking?.fromDate).format('MMMM Do YYYY, h:mm:ss a')
    return (
        <div className="card lg:card-side p-3 bg-slate-400 shadow-xl mt-1">
            <div>
                <div>
                    <h4 className='text-center m-1 font-semibold font-serif text-blue-800'>{booking?.car[0]?.carName}</h4>
                    <hr />
                </div>
                <figure>

                    <img
                        src={booking?.car[0]?.image}
                        alt="car" className='md:w-48 md:pl-3 rounded-md shadow-lg md:ml-2 md:mt-1' />
                </figure>
                {/* <div className='bg-white mt-2 rounded-md p-2'>
                    <div className='flex justify-between'>
                        <label>User Name :</label>
                        <span> {booking?.user[0]?.name}</span>
                    </div>
                    <div className='flex justify-between'>
                        <label>Phone :</label>
                        <span> {booking?.user[0]?.phone}</span>
                    </div>
                    <div className='flex justify-between'>
                        <label>Email : </label>
                        <span>{booking?.user[0]?.email}</span>
                    </div>


                </div> */}

            </div>
            <div className='divider-horizontal'></div>
            <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
                <h2 className="underline text-xl font-serif font-medium text-sky-900 mb-4">
                    Booking Details
                </h2>
                <ul className="">
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
        </div>)
}

export default BoookHistory
