import DropDownBt from "../../components/util/DropDownBt";


function AdminHome() {



    return (
        <div className="drawer min-h-screen">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn drawer-button">Drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu bg-cyan-700 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li className="content-center m-4">
                        <h2 className=" font-bold text-xl text-amber-600">Dashboard</h2>
                    </li>
                    <hr />
                    <li className="content-start py-4">
                        <DropDownBt></DropDownBt>
                    </li>

                </ul>

            </div>
        </div >
    )
}

export default AdminHome
