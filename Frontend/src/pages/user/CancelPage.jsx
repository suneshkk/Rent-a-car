import React from "react";
import CancelLogo from "../../assets/cancel.png"
import { Link } from "react-router-dom";
const PaymentSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="card w-96 bg-green-200 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                        src={CancelLogo}
                        alt="error"
                        className="rounded-xl w-24 h-24"
                    />
                </figure>
                <div className="card-body text-center">
                    <h2 className="card-title text-green-500 text-2xl">
                        Payment cancelled!
                    </h2>
                    <p className="text-gray-600">
                        Please Retry. <b>Your transaction is not completed</b>!.
                    </p>
                    <div className="card-actions justify-center mt-4">
                        <Link className="btn btn-primary btn-outline" to={"/user/payment"}>Payment</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
