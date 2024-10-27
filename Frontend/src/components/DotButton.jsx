import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function DotButton() {
    const [isOpen, setIsOpen] = useState(false);

    const dotMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = ()=>{
        setIsOpen(false)
    }
    return (
        <div className='relative'>
            <button onClick={dotMenu} className="btn btn-square btn-ghost ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h- w-7 stroke-current">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                </svg>
            </button>
            {isOpen && (
        <div className="absolute flex-col  right-0 top-15 mt-1 w-32 h-40 bg-info-content rounded-lg shadow-lg py-2">
          <div className="p-4">
          <div className="py-2">
            <Link to="/sign-up" onClick={closeMenu}>Sign Up</Link>
            </div>
          <div className="py-2">
            <Link to="/login"onClick={closeMenu}>Login</Link>
            </div>
          <div className="py-2">
            <Link to="/joinus"onClick={closeMenu}>Join Us</Link>
            </div>
          </div>
        </div>
      )}

        </div>
    )
}

export default DotButton
