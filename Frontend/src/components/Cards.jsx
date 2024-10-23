
import React from 'react'

function CarList(car) {
    // console.log(car,"ffghj==")
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src={car?.image}alt="CAR" />
        
    </figure>
    <div className="card-body">
      <h2 className="card-title">{car?.carName}</h2>
      <p>{car?.transmission}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">More Detailes</button>
      </div>
    </div>
    
  </div>
  )
}

export default CarList
