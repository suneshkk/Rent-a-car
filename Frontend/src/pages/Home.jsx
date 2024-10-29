import Hero from '../../src/assets/Hero.jpg'
function Home() {
  return (


    <div className='min-h-screen block bg-orange-300'>
      <div className="hero">
        <img src={Hero} alt=" image" className="hero h-min " />
        <div className="hero-content bg-opacity-45"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mt-40 text-5xl font-serif font-extrabold text-red-300">Drive Your Dreams! Your Journey Starts Here!</h1>
          </div>
        </div>
      </div>
      <div className=' min-h-screen bg-slate-200'>
        <div className='flex p-24 justify-between' >
          <div className=''>
            <h1>Global reach</h1>
          </div>
          <div className=''>
            <h1>Distinctive fleet</h1>
          </div>
          <div className=''>
            <h1>Exceptional service</h1>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home
