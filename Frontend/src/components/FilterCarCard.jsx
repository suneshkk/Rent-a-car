import React from 'react'
import { Link } from 'react-router-dom'

function FilterCarCard({carData}) {
  // console.log(carData,"cardata")
  return (
    <div className="car card-body">

      <div className=" card bg-slate-300 sm:w-52">
        <figure>
          <img src={carData?.image} alt="Car" className="" />
        </figure>

        <div className='flex justify-between m-2 '>
          <div className=''>
            <h2 className="card-title">{carData?.carName}</h2>
            <p className='text-sm font-bold text-neutral-700'>{carData?.transmission}</p>
          </div>
          <div className=''>
            <Link to={`/user/book-now/${carData?._id}`}>
              <button className="btn btn-success">About Car</button>
            </Link>

          </div>


        </div>
      </div>
    </div>
  )
}

export default FilterCarCard
