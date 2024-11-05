import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance.jsx';

function AdminEdit() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    // const [profilePic,setProfilePic] = useState([]);
    const {id} = useParams();
    // const [profilePic, setProfilePic] = useState(null)

    const handleUpdate = async () => {
        const data ={
            name,
            email,
            password,
            phone,
            // profilePic
        };
        try{
            const response = await axiosInstance.put(`/admin/update ${id}`,data,
                { Credential:true});

        }catch(error){
            toast.error("something went wrong");
            console.log(error);
        };
    };


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card card-body bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="name" className="input input-bordered" required
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input type="text" placeholder="phone" className="input input-bordered" required
                onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required
                onChange={(e) => setPassword(e.target.value)} />
              <label className="label">

              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEdit
