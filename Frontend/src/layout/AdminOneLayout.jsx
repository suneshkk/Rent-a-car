import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminOneFooter from '../components/adminOne/AdminOneFooter.jsx'

function AdminOneLayout() {
  return (
    <div>
      <Outlet/>
      {/* <AdminOneFooter/> */}
    </div>
  )
}

export default AdminOneLayout
