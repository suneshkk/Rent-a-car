import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import CarList from '../../components/Cards.jsx';
import Loader from '../../components/util/Loader.jsx';
import FilterCarCard from '../../components/FilterCarCard.jsx';
import toast from 'react-hot-toast';

function CarGallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [car, setcar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [carType, setCarType] = useState("");
    const [carData, setCarData] = useState([]);
    //  console.log("cartype",carData)
    const fetchCar = async () => {
        setLoading(true);
        try {
            const responce = await axiosInstance.get('/car/car-list', {
                withCredentials: true,
            });
            setLoading(false);
            setcar(responce?.data?.data);
            // console.log(responce)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };
    
    const handleSearch = async () => {

        try {
            const responce = await axiosInstance.post('/car/filter', { car: carType }, { withCredentials: true, });
            // console.log("data",responce)
            setCarData(responce?.data?.data);

        } catch (error) {
            console.log(error);

        };
    };

    useEffect(() => {
        fetchCar();
        handleSearch();
        handle();
    }, [])

    return (
        <div className="min-h-screen md:flex md:gap-3">
            {/* <div className='w-80 bg-sky-300'>
                <div className='text-center'>
                    <h1 className='text-lg font-semibold m-5'>Filter Car <hr /></h1>
                </div>
                <div className='bg-slate-100'>
                    <button className='mb-3' onClick={() => setIsOpen(!isOpen)}>
                        <h1 className='text-base font-medium hover:underline ml-2'>Search car by type  <span className='ml-28'> {isOpen ? "▲" : "▼"}</span></h1>

                    </button>
                    {isOpen && (

                        <div>
                            <div className='ml-4'>
                                <input
                                    type="text"
                                    value={carType}
                                    onChange={(e) => setCarType(e.target.value)}
                                    placeholder="Enter car type (e.g,Sedan)"
                                />
                                <button className='ml-4 font-medium' onClick={handleSearch}>Search</button>

                            </div>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    sedan
                                </span>

                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    suv
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    truck
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    coupe
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    convertible
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    wagon
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    van
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    hatchback
                                </span>
                                <hr />
                            </li>

                        </div>


                    )}

                </div> */}

            {/* </div> */}


            {loading ?
                (<Loader />) : (
                    <div className="md:grid md:grid-cols-6 mr-5" >
                        {car.map((value) => (
                            <CarList car={value} key={value?._id} />
                        ))}
                    </div>
                )}

            {/* <div>
                <div className="md:grid md:grid-cols-5 mr-5" >
                    {carData.map((v) => (
                        <FilterCarCard carData={v} key={v?._id} />
                    ))}
                </div>

            </div> */}

        </div>



    )
}

export default CarGallery
