import bmwPhoto from "../../assets/bmwbg.png";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function AdminOneHome() {
  return (
    <div className="h-screen flex bg-center rounded-xl bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e] ">
      <div className="bg-slate-300  w-80 flex flex-col border-2 rounded-md bg-gradient-to-r from-[#354d56] via-[#4a8eac] to-[#385a69]">
        <div
          className="h-32 bg-cover bg-center text-center content-center"
          style={{ backgroundImage: `url(${bmwPhoto})` }}
        >
          <div className="">
            <h2 className="mt-1 text-2xl text-gray-50 font-bold text-opacity-100 ">
              <u> Admin Controles</u>
            </h2>
          </div>
        </div>
        <div className="mt-10 mx-5 gap-5 flex flex-col text-start">
          <div className="border-b-2 flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-stone-300">
              <Link to={"/admin-one/user-data"}>User data</Link>
            </h2>
            <ArrowRightIcon className="w-5 h-5 " />
          </div>
          <div className="border-b-2 flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-stone-300">
              <Link to={"/admin-one/dealer-data"}> Dealer Data</Link>
            </h2>
            <ArrowRightIcon className="w-5 h-5 " />
          </div>
          <div className="border-b-2 flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-stone-300"><Link to={"/admin-one/available-cars"}>Available Cars</Link> </h2>
            <ArrowRightIcon className="w-5 h-5 " />
          </div>

          <div className="border-b-2 flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-stone-300"><Link to={"/admin-one/booked-cars"}>Booked Cars</Link></h2>
            <ArrowRightIcon className="w-5 h-5 " />
          </div>
          <div className="border-b-2 flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-stone-300"><Link to={"/admin-one/reviews"}> Reviews</Link></h2>
            <ArrowRightIcon className="w-5 h-5 " />
          </div>
          <div className="border-b-2 flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-stone-300"><Link to={"/admin-one/payment-details"}>Payment Data</Link> </h2>
            <ArrowRightIcon className="w-5 h-5 " />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default AdminOneHome;
