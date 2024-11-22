import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance.jsx';
import CarList from '../components/Cards.jsx';
import HeroImage from "../../src/assets/hero.png";
import BmwCar from "../../src/assets/bmw.png"
import Benz from '../../src/assets/benz.png';
import Car2 from '../../src/assets/car2.png';
import Car3 from '../../src/assets/car3.png';
import { Link } from 'react-router-dom';
import Loader from '../components/util/Loader.jsx';

function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchCar = async () => {
    setLoading(true)
    try {
      const responce = await axiosInstance.get('/car/car-list', {
        withCredentials: true,
      });
      setLoading(false)
      setData(responce?.data?.data);
    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };
  useEffect(() => {
    fetchCar();
  }, [])


  return (
    <div className=''>

      <div className='bg-cover bg-black'>
        <div className='bg-cover h-128 opacity-70' style={{ backgroundImage: `url(${HeroImage})` }} >
        </div>

        <div className="bg-orange-600 hover:bg-slate-300 bg-opacity-100 h-44  sm:p-6 lg:p-5 rounded-sm text-center ">
          <h1 className=" text-xl md:text-5xl font-extrabold text-black mb-3 sm:mb-4">
            RENT YOUR DREAM CAR TODAY
          </h1>
          <hr className='' />
          <p className=" sm:text-base md:text-lg font-black text-black ">
            Choose from a wide range of vehicles to suit your needs.
          </p>
        </div>
        {/* <div className='px-4 sm:px-6 md:px-8 lg:px-12 py-8'>
          <div className="bg-amber-100 flex h-16 sm:h-20 items-center justify-center mb-4 sm:mb-6">
            <h1 className="font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center">
              <Link to={'/car-gallery'}>
                Book Your car now

              </Link>
            </h1>
          </div>
          {loading ? (<Loader />) : (
            <div className="grid">
              <div className='xl:grid xl:grid-cols-4 lg:flex lg:flex-wrap md:grid md:grid-cols-3 sm:flex sm:flex-wrap'>
                {data.map((value) => (
                  <CarList car={value} key={value?._id} />
                ))}

              </div>
            </div>
          )}
        </div> */}
        <div>
          <div className='md:h-28 md:mt-20 '>
           <h1 className='text-slate-400 text-center md:text-6xl font-serif md:font-bold hover:text-slate-100'>The perfect car for your next trip</h1>
          </div>
        <div className="md:grid md:grid-cols-2 mt-3 mx-4 grid grid-cols-1">
          <div className='m-2 rounded-md md:h-80 bg-cover grid md:grid-cols-2  ' style={{ backgroundImage: `url(${BmwCar})` }} >
            <div className='mt-14 ml-8'>
              <h1 className=' md:text-3xl text-slate-200 font-serif md:font-extrabold'>Our Brand New Car </h1>
              <hr />
              <p className=' md:text-2xl text-black md:font-extrabold  '>BMW 7 series</p>
            </div>
            <div className='ml-44 mb-10 flex flex-col-reverse'>
              <p className='md:text-lg text-gray-300 md;font-bold font-serif'>First 5 Booking</p>
              <p className='md:text-lg text-white font-mono md:font-bold'>Up to 5% Discount For</p>
              <hr />
            </div>

          </div>
          <div className='m-2 rounded-md h-80 bg-cover bg-center grid grid-cols-2  ' style={{ backgroundImage: `url(${Benz})` }} >
          <div className='md:mt-14 ml-4'>
              <h1 className=' md:text-2xl text-slate-200 font-serif md:font-extrabold'>Experience The Luxury</h1>
              <hr />
              <p className=' underline md:text-2xl text-cyan-800 md:font-extrabold  '>The All New Benz Class</p>
            </div>
            <div className='md:ml-44 md:mb-10 flex flex-col-reverse'>
              </div>

          </div>
          </div>

          {/* <div className=" flex h-16 sm:h-20 items-center justify-center mb-4 sm:mb-6">
            <h1 className="text-orange-500 font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center ">
              Our Future Cars
            </h1>
          </div> */}

          <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {/* <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
              <figure>
                <img src={Car1} alt="Car" className="w-full h-40 sm:h-48 object-cover" />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg md:text-xl">Lamborghini SUV Urus</h2>
                <p className="text-gray-600 mt-2">Experience luxury and performance.</p>
              </div>
            </div> */}
            {/* <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
              <figure>
                <img src={Car2} alt="Car" className="w-full h-40 sm:h-48 object-cover" />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg md:text-xl">Bentley GT</h2>
                <p className="text-gray-600 mt-2">Experience luxury and performance.</p>
              </div>
            </div> */}
            {/* <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
              <figure>
                <img src={Car3} alt="Car" className="w-full h-40 sm:h-48 object-cover" />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg md:text-xl">Jaguar Land Rover</h2>
                <p className="text-gray-600 mt-2">Experience luxury and performance.</p>
              </div>
            </div> */}
          </div>
        </div>

      </div>
    </div>
  )
}
export default Home
