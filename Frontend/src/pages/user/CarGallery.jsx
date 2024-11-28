import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import CarList from '../../components/Cards.jsx';
import Loader from '../../components/util/Loader.jsx';

function CarGallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [car, setcar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeLoading, setTypeLoading] = useState(true);
    const [sedan, setSedan] = useState("")
    const [suv, setSuv] = useState("")
    const [truck, setTruck] = useState("")
    const [coupe, setCoupe] = useState("")
    const [convertible, setConvertible] = useState("")
    const [wagon, setWagon] = useState("")
    const [van, setVan] = useState("")
    const [hatchBack, setHatchkBack] = useState("")

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

    const fetchCartype = async () => {
        setTypeLoading(true);
        try {
            const responce = await axiosInstance.get('/car/car-type', { withCredentials: true });
            setSedan(responce?.data?.data);
            setSuv(responce?.data?.data);
            setTruck(responce?.data?.data);
            setCoupe(responce?.data?.data);
            setConvertible(responce?.data?.data);
            setWagon(responce?.data?.data);
            setVan(responce?.data?.data);
            setHatchkBack(responce?.data?.data);
            console.log("response========++++++", responce)
        } catch (error) {
            console.log(error);
            setTypeLoading(false);

        }
    }
    useEffect(() => {
        fetchCar();
        fetchCartype();
    }, [])

    return (
        <div className="min-h-screen md:flex md:gap-3">
            <div className='w-80 bg-sky-300'>
                <div className='text-center'>
                    <h1 className='text-lg font-semibold m-5'>Filter Car <hr /></h1>
                </div>
                <div className='bg-slate-100'>
                    <button className='mb-3' onClick={() => setIsOpen(!isOpen)}>
                        <h1 className='text-base font-medium ml-7 hover:underline'>Car Type  <span className='ml-40'> {isOpen ? "▲" : "▼"}</span></h1>

                    </button>
                    {isOpen && (
                        <div>

                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                </span>
                                <button value={sedan}
                                    onClick={(e) => setSedan(e.target.value)}>
                                    Sedan
                                </button>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    SUV
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    Truck
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    Coupe
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    Convertible
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    Wagon
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    Van
                                </span>
                                <hr />
                            </li>
                            <li className='ml-3 mb-2'>
                                <span className='text-sm font-semibold text-slate-600'>
                                    Hatch Back
                                </span>
                                <hr />
                            </li>

                        </div>


                    )}
                </div>

            </div>


            {loading ?
                (<Loader />) : (
                    <div className="md:grid md:grid-cols-5 mr-5" >
                        {car.map((value) => (
                            <CarList car={value} key={value?._id} />
                        ))}
                    </div>
                )}
        </div>


    )
}

export default CarGallery
