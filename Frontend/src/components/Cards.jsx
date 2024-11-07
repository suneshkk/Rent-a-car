
import React from 'react'
import { Link } from 'react-router-dom'

function CarList({ car }) {
  // console.log(car, "ffghj==")
  return (
    <div className="ard bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">

      <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
        <figure>
          <img src={car?.image} alt="Car" className="w-full h-40 sm:h-48 object-cover" />
        </figure>
        <div className="card-body p-4 flex flex-row justify-between">
          <div>
            <h2 className="card-title">{car?.carName}</h2>
            <p>{car?.transmission}</p>
          </div>
          <div>
            <Link to={`/car-details/${car?._id}`}>
              <button className="btn btn-primary">More Detailes</button>
            </Link>

          </div>

        </div>
      </div>


    </div>
  )
}

export default CarList
