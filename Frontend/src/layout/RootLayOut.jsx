import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { Outlet } from 'react-router-dom'

function RootLayOut() {
    return (
        <div >
            <Header />
            <Outlet />

            {/* <Footer /> */}
        </div>
    )
}

export default RootLayOut
