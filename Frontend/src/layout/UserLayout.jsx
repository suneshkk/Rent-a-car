
import React from 'react'
import Footer from '../components/Footer.jsx'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader.jsx'
function UserLayout() {
    return (
        <div>
            <UserHeader/>
            <Outlet />
            <Footer />

        </div>
    )
}

export default UserLayout
