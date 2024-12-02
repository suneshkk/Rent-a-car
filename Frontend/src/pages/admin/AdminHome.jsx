import DropDownBt from "../../components/util/DropDownBt.jsx";
import DropDownUser from "../../components/util/DropDownUser.jsx";


function AdminHome() {



    return (
        <div className="bg-cover bg-center min-h-screen bg-red-100">

            <div className="lg:grid lg:grid-cols-3 min-h-screen">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn drawer-button">Drawer</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                        <div className="menu bg-cyan-700 text-base-content min-h-full w-80 p-4">
                            <div className="text-center m-3">
                                <h2 className=" font-bold text-xl text-amber-600">Dashboard</h2>
                                <hr />
                            </div>
                            <div>
                                <li className="content-start py-4">
                                    <DropDownBt></DropDownBt>
                                    <hr />

                                </li>
                            </div>
                            <div>
                                <li className="content-start py-4">
                                    <DropDownUser></DropDownUser>
                                    <hr />
                                </li>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="bg-black w-auto">

                </div>
                <div className="bg-red-700 lg:flex flex-col">
                    <div className="bg-black w-">                    <h1>hh</h1>
                    </div>
                </div>

            </div >
        </div>
    )
}

export default AdminHome
