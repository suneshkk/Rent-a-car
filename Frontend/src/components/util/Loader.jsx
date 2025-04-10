import React from 'react'

function Loader() {
    return (
        <div className="flex items-center content-center justify-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-gray-100">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
