import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminOneFooter from '../components/adminOne/AdminOneFooter.jsx'
import AdminOneHeader from '../components/adminOne/AdminOneHeader.jsx'

function AdminOneLayout() {
  return (
    <div>
      <AdminOneHeader/>
      <Outlet/>
      {/* <AdminOneFooter/> */}
    </div>
  )
}

export default AdminOneLayout
