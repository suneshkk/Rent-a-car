
import React from 'react'
import { Link } from 'react-router-dom'

function CarList({ car }) {
  return (
    <div className="car card-body">

      <div className=" card bg-slate-300 sm:w-52">
        <figure>
          <img src={car?.image} alt="Car" className="" />
        </figure>

        <div className='flex justify-between m-2 '>
          <div className=''>
            <h2 className="card-title">{car?.carName}</h2>
            <p className='text-sm font-bold text-neutral-700'>{car?.transmission}</p>
          </div>
          <div className=''>
            <Link to={`/car-details/${car?._id}`}>
              <button className="btn btn-success">About Car</button>
            </Link>

          </div>


        </div>
      </div>
    </div>


  )
}

export default CarList
