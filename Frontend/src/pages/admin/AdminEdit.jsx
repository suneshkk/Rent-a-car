import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance.jsx';

function AdminEdit() {
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  // const [image,setImage] = useState("");

  const fetchUer = async (e) => {
    e.preventDefault();
    try {
      const respopnse = await axiosInstance.put('/admin/update', { withCredentials: true });

       console.log("response====",respopnse)
    } catch (error) {
      toast.error("somthing went wrong");
      console.log(error)
    };
  };
  useEffect(() => {
    fetchUer()
  }, [])

  return (
      <div className="row justify-content-center pt-5">
        {/* <div className="card border-success  col-md-6 bg-info" style={{ maxWidth: "30rem" }}>
          <div className="card-header bg-transparent border-success">
            <h1 className="text-center my-4">Update Profile</h1>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted">Phone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="d-flex justify-content-between py-4">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Save
            </button>
          </div>
        </div> */}
      </div>

      )
}

      export default AdminEdit
