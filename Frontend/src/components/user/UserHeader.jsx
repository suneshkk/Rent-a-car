import React, {  useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyImage from '../../assets/logo.png'
function UserHeader() {

    const location = useLocation();
    const [isOpen, setIsopen] = useState(false);
    // const [typeIsOpen, setTypeIsOpen] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [carType, setCarType] = useState([]);

    // const toggleDropdown = () => {
    //     setIsopen(!isOpen);
    // };
    // const closeMenu = () => {
    //     setIsopen(false);
    // };


    // const fetchCarType = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axiosInstance.get('/car/filter-type', { car: carType },
    //             { withCredentials: true });

    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         // toast.error("no data forthis search ");
    //         setLoading(false)
    //     };
    // };
    // useEffect(() => {
    //     fetchCarType();
    // }, [])

    return (

        <div className="navbar border-b-2 bg-transparent flex justify-between items-center px-4 md:px-14 h-20">
            <div className="flex-1"></div>
            <div className="flex-none md:flex-none sm:grid content-center leading-relaxed">
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    <img src={MyImage} alt="logo" className="h-12" />
                    <span className="underline">
                        <b className="lg:text-4xl font-bold text-opacity-italic text-amber-700 sm:text-lg">W</b>
                        <b className="-tracking-wide">eelzn</b>
                        <b>ow</b>
                    </span>
                </Link>
            </div>
            <div className="flex-1 flex justify-end ">
                {location.pathname == '/user/home' && (
                    <Link to={'/user/profile'} className="text-lg text-emerald-900 font-bold">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>

                )}
            </div>
            {/* <div>
                {location.pathname == '/user/car-gallery' && (
                    <div className='relative flex gap-4'>
                        <div>
                            <button className='hover:border-b-4 hover:scale-125 text-sm text-red-700 font-bold' onClick={toggleDropdown}>filter</button>
                        </div>
                        {isOpen && (
                            <div className='rounded-xl absolute bg-slate-200 top-20 right-0  w-52 z-50'>
                                <div>
                                    <button onClick={() => { setTypeIsOpen(!typeIsOpen) }} className='m-4 '>
                                         <p className='font-serif font-bold text-sm'>Car Type  </p></button>
                                    
                                    {typeIsOpen && (
                                        <div>
                                            <ul>
                                                <li className='ml-3 mb-2'>
                                                    <span className='text-sm font-semibold text-slate-600'>
                                                       <button onClick={() =>{closeMenu()}}>
                                                      <p>sedan</p>  
                                                        </button> 
                                                    </span>

                                                    <hr />
                                                </li>
                                                <li className='ml-3 mb-2'>
                                                    <span className='text-sm font-semibold text-slate-600'>
                                                    <button onClick={() =>{closeMenu()}}>suv</button> 
                                                    </span>
                                                    <hr />
                                                </li>
                                                <li className='ml-3 mb-2'>
                                                    <span className='text-sm font-semibold text-slate-600'>
                                                    <button onClick={() =>{closeMenu()}}>truck</button> 
                                                    </span>
                                                    <hr />
                                                </li>
                                                <li className='ml-3 mb-2'>
                                                    <span className='text-sm font-semibold text-slate-600'>
                                                    <button onClick={() =>{closeMenu()}}>coupe</button> 
                                                    </span>
                                                    <hr />
                                                </li>
                                                <li className='ml-3 mb-2'>
                                                    <span className='text-sm font-semibold text-slate-600'>
                                                    <button onClick={() =>{closeMenu()}}>convertible</button> 
                                                    </span>
                                                    <hr />
                                                </li>
                                                <li className='ml-3 mb-2'>
                                                    <span className='text-sm font-semibold text-slate-600'>
                                                    <button onClick={() =>{closeMenu()}}>wagon</button> 
                                                    </span>
                                                    <hr />
                                                </li>
                                                <li className='ml-3 mb-2'>
                                                    <span className='text-sm font-semibold text-slate-600'>
                                                    <button onClick={() =>{closeMenu()}}>van</button> 
                                                    </span>
                                                    <hr />
                                                </li>
                                                <li className='ml-3 mb-2'>
                                                    <span className='text-sm font-semibold text-slate-600'>
                                                    <button onClick={() =>{closeMenu()}}>hatchback</button> 
                                                    </span>
                                                    <hr />
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>

 */}
        </div>
    );
}

export default UserHeader;

