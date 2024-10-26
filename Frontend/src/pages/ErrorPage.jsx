import { Link } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col justify-center items-center w-full h-screen text-center '>
            <div className='container '>
                <h1 className='pb-7 font-bold text-xl		'>404 Page Not Found!</h1>
                <button className="btn btn-active btn-primary font-bold text-xl" onClick={() => navigate('/')}>GO to Home</button>

            </div>
        </div>
    )
}

export default ErrorPage
