import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import Loader from "../../components/util/Loader";

function DealerData() {
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState();

  const fetchDealerData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/fetch-dealer-data", {
        withCredentials: true,
      });
      setUser(response?.data?.data);
      toast.success(response?.data?.message);
      console.log("dealer data", response);
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
    fetchDealerData();
  }, []);
  return (
    <div className="h-screen content-center rounded-xl bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e] ">
      <div className="mx-5 mt-14 m p-6 border rounded-lg shadow-lg bg-gradient-to-r from-[#22576c] to-[#2480a8]">
        <h2 className="text-xl font-bold mb-4 text-white">User Data</h2>
        <div className="overflow-y-auto h-96 border border-cyan-800 rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e] sticky top-0">
                <tr className="text-white">
                  <th className="p-2 border">No</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">State</th>
                  <th className="p-2 border">District</th>
                  <th className="p-2 border">Address</th>

                  <th className="p-2 border">Role</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {user.length > 0 ? (
                  user.map((user, index) => (
                    <tr
                      key={ index}
                      className="bg-gradient-to-r from-[#032330] to-[#04384e]"
                    >
                      <td className="p-2 border text-white">{index + 1}</td>
                      <td className="p-2 border">{user.name}</td>
                      <td className="p-2 border">{user.email}</td>
                      <td className="p-2 border">{user.phone}</td>
                      <td className="p-2 border">{user.state || "Null"}</td>
                      <td className="p-2 border">{user.district || "Null"}</td>
                      <td className="p-2 border">{user.address || "Null"}</td>

                      <td className="p-2 border">{user.role || "dealer"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No user data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default DealerData;
