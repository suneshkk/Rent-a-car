import React, { useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/util/Loader.jsx';

function AddReview() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        comment,
        rating,
      };
      // console.log(data,"data========")
      if (!comment || !rating) {
        alert("alfields required");
      };

      const response = await axiosInstance.post(`/review/add-review/${id}`,data, { withCredentials: true });
      setLoading(false);
    navigate('/user/home')
    } catch (error) {
      setLoading(false)
      console.log(error);
    };
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-cover bg-sky-400'>
      {loading ? (<Loader />) : (
        <div className='card card-body bg-cover bg-white shadow-md lg:min-h-128 lg:mx-128 md:mx-20'>
          <h1 className='text-blue-950 card-title lg:border-b-8 '><b>Car Review</b></h1>
          <div>
            <p className='font-bold font-serif bg-cyan-800 text-slate-400'> Share your experience and help others choose the perfect car!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Rating (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>


        </div>
      )}


    </div>
  )
}

export default AddReview
