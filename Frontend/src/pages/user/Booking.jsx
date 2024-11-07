import React from 'react'

function Booking() {
    const Booking = async () => {

        try {
            const responce = await axiosInstance({
                method: 'post',
                url: `/rental/for-booking/${id}`,
            });
            toast.success('added successfully')
            console.log("response", responce)
        } catch (error) {
            toast.error('Please-login')
            console.log(error);
        };
    };




  return (
    <div>
    <h1>car booking</h1>
    </div>
  )
}

export default Booking
