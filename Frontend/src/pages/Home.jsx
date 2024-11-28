import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance.jsx';
import CarList from '../components/Cards.jsx';
import HeroImage from "../../src/assets/hero.png";
import BmwCar from "../../src/assets/bmw.png"
import Benz from '../../src/assets/benz.png';
import Car2 from '../../src/assets/car2.png';
import Mustang from '../../src/assets/mustang.png';
import { Link } from 'react-router-dom';
import Loader from '../components/util/Loader.jsx';
import { FaCar } from "react-icons/fa6";

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
        <div className='bg-cover bg-center min-h-64 md:h-128 opacity-70' style={{ backgroundImage: `url(${HeroImage})` }} >
        </div>

        <div className="bg-orange-600  hover:bg-slate-300 bg-opacity-100  lg:p-5 rounded-sm text-center ">
          <h1 className="text-lg p-2 font-extrabold md:text-5xl md:font-extrabold text-black md:mb-3">
            RENT YOUR DREAM CAR TODAY
          </h1>
          <hr className='hidden'/>
          <p className="font-semibold font-mono md:text-lg md:font-black text-black ">
            Choose from a wide range of 
            vehicles to suit your needs.
          </p>
        </div>
        <div>
          <div className='h-10 pt-4 md:h-28 md:mt-20 '>
            <h1 className='text-xl font-semibold text-slate-400 text-center hover:underline md:text-6xl font-serif md:font-bold hover:text-slate-100 '>
              The perfect car for your next trip
              </h1>
          </div>
          <div className="md:grid md:grid-cols-2 mt-3 mx-4 grid grid-cols-1">
            <div className='h-52 m-2 bg-center rounded-md md:h-80 bg-cover grid md:grid-cols-2  ' style={{ backgroundImage: `url(${BmwCar})` }} >
              <div className='md:mt-14 md:ml-8'>
                <h1 className='font-bold md:text-3xl text-slate-200 font-serif md:font-extrabold ml-1 mt-2'>Our Brand New Car </h1>
                <hr className='hidden'/>
                <p className='ml-1 md:text-2xl text-black md:font-extrabold font-bold  '>BMW 7 series</p>
              </div>
              <div className='ml-44 mb-10 flex flex-col-reverse'>
                <p className='font-semibold md:text-lg text-gray-300 md:font-bold font-serif'>First 5 Booking</p>
                <p className='text-sm font-semibold md:text-lg text-white font-mono md:font-bold'>Up to 5% Discount For</p>
                <hr  className='hidden'/>
              </div>

            </div>
            <div className='h-52 m-2 rounded-md md:h-80 bg-cover bg-center' style={{ backgroundImage: `url(${Benz})` }} >
              <div className='md:mt-8 md:ml-4'>
                <h1 className='font-bold ml-1 mt-2 md:text-2xl text-slate-200 font-serif md:font-extrabold'>Experience The Luxury</h1>
                <hr className='hidden' />
                <p className='font-bold ml-1 md:underline md:text-2xl text-cyan-800 md:font-extrabold  '>The All New Benz Class</p>
              </div>
              <div className='md:ml-44 md: mb-10 flex flex-col-reverse'>
              </div>

            </div>
          </div>

          <div className='bg-slate-200 bg-cover pb-6'>
            <div className='grid grid-cols-1 text-center md:mx-20 md:pt-20 md:pb-5 md:grid md:grid-cols-3 '>
              <div className='md:h-40 md:pt-3 h-32 '>
                <div className='flex ml-28 mt-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z" clipRule="evenodd" />
                  </svg>
                  <h1 className='mb-2  md:mb-3 font-bold text-xl underline'>
                    India reach
                  </h1>
                </div>
                <div>
                  <p className='text-lg font-bold md:text-xl md:font-bold'>  200+ Outlets all over in India </p>
                  <p className='text-lg font-bold md:text-xl md:font-bold'> Number one car rental website in India </p>

                </div>

              </div>
              <div className='md:h-40 md:pt-3 h-32'>
                <div className='flex ml-28 mt-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  <h1 className='mb-3 font-bold text-xl underline'>
                    24*7 service
                  </h1>
                </div>
                <div>
                  <p className='text-lg font-bold md:text-xl md:font-bold'>  Any time customer service available </p>
                  <p className='text-lg font-bold md:text-xl md:font-bold'> No extra cost </p>

                </div>
              </div>
              <div className='md:h-40 md:pt-3 h-32'>
                <div className='flex ml-36'>
                  <h1 className='text-2xl'>
                    <FaCar />
                  </h1>
                  <h1 className='mb-3 font-bold text-xl underline'>
                    Cars
                  </h1>
                </div>
                <div>
                  <p className=' text-lg font-bold md:text-xl md:font-bold'> Small size cars to suvs are available in affordable price </p>
                   
                </div>
              </div>

            </div>
            <div className='h-56 bg-cover bg-center md:mx-40 rounded-md md:h-128 opacity-75' style={{ backgroundImage: `url(${Mustang})` }}>
              <div className='md:pt-7 md:pl-9'>
                <h1 className='text-yellow-400 text-xl font-bold pt-3 underline md:font-extrabold md:text-4xl md:text-slate-300 '>This week deal</h1>
              </div>
              <div className='md:pt-7 md:pl-9'>
                <h1 className='text-yellow-400 md:font-bold md:text-xl'>20% discount on SUV booking for more than 2 days</h1>
              </div>
            </div>

          </div>


        </div>

      </div>
    </div>
  )
}
export default Home
