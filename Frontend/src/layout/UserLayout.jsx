
import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader.jsx'
import UserFooter from '../components/user/UserFooter.jsx'
function UserLayout() {
    return (
        <div>
            <UserHeader/>
            <Outlet />
            <UserFooter/>

        </div>
    )
}

export default UserLayout
