import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useEffect } from "react";

function UserData() {
  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/admin/User-data", {
        withCredentials: true,
      });
      setUser(response?.data?.data);
      //   toast.success(response?.data?.message);
      console.log("User data", response);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">User Data</h2>
      <div className="overflow-y-auto h-96 border border-gray-300 rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {user.length > 0 ? (
              user.map((user, index) => (
                <tr key={user._id || index} className="odd:bg-gray-50 even:bg-white">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role || "User"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No user data available
                </td>
              </tr>
            )}
          </tbody>        </table>
      </div>
    </div>
  );
}

export default UserData;
