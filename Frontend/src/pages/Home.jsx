import HeroImage from '/src/assets/Hero.jpg'
import Car1 from '/src/assets/Car1.jpg'
import Car2 from '/src/assets/Car2.jpg'
import Car3 from '/src/assets/Car3.jpg'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance.jsx';
import CarList from '../components/Cards.jsx';

function Home() {

  const [data, setData] = useState([]);


  const fetchCar = async () => {

    try {
      const responce = await axiosInstance.get('/car/car-list', {
        withCredentials: true,
      });

      setData(responce?.data?.data);
      // console.log(responce)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCar();
  }, [])


  return (

    <div>
    
      <section
        className="bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="bg-black bg-opacity-50 p-4 sm:p-6 md:p-10 lg:p-12 rounded-lg max-w-lg text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Rent Your Dream Car Today
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
            Choose from a wide range of vehicles to suit your needs.
          </p>
        </div>
      </section>
      <div className='px-4 sm:px-6 md:px-8 lg:px-12 py-8'>
        <div className="bg-amber-100 flex h-16 sm:h-20 items-center justify-center mb-4 sm:mb-6">
          <h1 className="font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center">
            Book Your car now
          </h1>
        </div>
        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {data.map((value) => (
            <CarList car={value} key={value?._id} />
          ))}
        </div>

      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <div className="bg-amber-100 flex h-16 sm:h-20 items-center justify-center mb-4 sm:mb-6">
          <h1 className="font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center">
            Our Future Cars
          </h1>
        </div>

        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
            <figure>
              <img src={Car1} alt="Car" className="w-full h-40 sm:h-48 object-cover" />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg md:text-xl">Lamborghini SUV Urus</h2>
              <p className="text-gray-600 mt-2">Experience luxury and performance.</p>
            </div>
          </div>
          <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
            <figure>
              <img src={Car2} alt="Car" className="w-full h-40 sm:h-48 object-cover" />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg md:text-xl">Bentley GT</h2>
              <p className="text-gray-600 mt-2">Experience luxury and performance.</p>
            </div>
          </div>
          <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
            <figure>
              <img src={Car3} alt="Car" className="w-full h-40 sm:h-48 object-cover" />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg md:text-xl">Jaguar Land Rover</h2>
              <p className="text-gray-600 mt-2">Experience luxury and performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
