


function RentalCard({ item }) {


    return (
        <div className="container flex flex-col items-center gap-8 ">
            <div className="flex flex-row w-64 h-64 bg-blue-500 p-4 rounded-lg shadow-lg">
                <div>
                    <img src={item?.carId?.image} alt="catn image" />
                </div>
                <div>
                    <h4>{item?.carId?.carName}</h4>
                    <h4>{item?.carId?. brand}</h4>
                    <h4>{item?.carId?.type}</h4>
                    <h4>{item?.carId?.fuelType}</h4>
                    <h4>{item?.price}</h4>
                    <h4>{item?.carId?.location}</h4>

                </div>
            </div>
        </div>
    )
}

export default RentalCard
