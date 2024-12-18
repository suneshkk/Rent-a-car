import React from 'react'

function Loader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
