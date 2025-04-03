import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Loader from "../../components/util/Loader";

function PaymentData() {
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState([]);

  const fetchPayment = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/payment/check-payment", {
        withCredentials: true,
      });
      setPayment(response?.data?.data);
      // toast.success(response?.data?.message);
      console.log("payment data", response);
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);
  return (
    <div className="h-lvh flex justify-center items-center content-center rounded-xl bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e] ">
      <div className="bg-slate-300 w-4/6 h-3/5 rounded-xl shadow-xl">
        <h2 className="text-blue-600 capitalize text-xl font-bold pt-5 pl-8 pb-3 border-b-2 shadow-xl">
          payment details
        </h2>
        <div className="overflow-y-auto h-4/5">
          <table className="border-spacing-1  border-separate w-full">
            <thead className="sticky top-0 ">
              <tr className="bg-slate-600 h-10 text-slate-200 " >
                <th className="capitalize w-1/4">car</th>
                <th className="capitalize w-1/4">user</th>
                <th className="capitalize w-1/4">payment status</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : (
              <tbody>
                {payment.length > 0 ? (
                  payment.map((payment, index) => (
                    <tr key={index} className=" text-lg font-serif shadow-xl ">
                      <td className="h-10 bg-slate-100 text-black pl-8">
                        {payment?.carId?.carName}
                      </td>
                      <td className="h-20 bg-slate-100 text-black pl-8 ">
                        <p> {payment?.userId?.name}</p>
                        <p> {payment?.userId?.phone}</p>
                      </td>
                      <td className="h-10 bg-slate-100 text-green-800 pl-8">
                        {payment?.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No reviews data available
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentData;
