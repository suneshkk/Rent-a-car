import { Outlet } from "react-router-dom"
import Footer from "../components/Footer.jsx"
import AdminHeader from "../components/admin/AdminHeader.jsx"

function AdminLayout() {
    return (
        <div>
            <AdminHeader/>
            <Outlet />
            <Footer />
        </div>
    )
}

export default AdminLayout
