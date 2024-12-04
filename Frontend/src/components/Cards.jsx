
import React from 'react'
import { Link } from 'react-router-dom'

function CarList({ car }) {
  return (
    <div className="car card-body">

      <div className=" card bg-slate-300 w-36">
        <figure className='w-36'>
          <img src={car?.image} alt="Car" />
        </figure>

        <div className='p-1'>
          <div className=''>
            <h2 className="text-xs font-bold">{car?.carName}</h2>
            <p className='text-xs font-bold text-neutral-700'>{car?.transmission}</p>

          </div>
          <div className='text-end'>
            <Link to={`/user/book-now/${car?._id}`}>
              <button className="btn btn-xs  btn-success ">About Car</button>
            </Link>

          </div>


        </div>

      </div>
    </div>


  )
}

export default CarList
