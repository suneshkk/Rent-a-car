import { Order } from "../model/paymentModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const client_domain = process.env.CLIENT_DOMAIN;

export const payment = async (req, res, next) => {
  try {
    const { bookedCar } = req.body;
    console.log("paymet=======", bookedCar);
    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: bookedCar?.carId?.carName,
            images: [bookedCar?.carId?.image],
          },
          unit_amount: Math.round(bookedCar?.totalAmount * 100),
        },
        quantity: 1,
      },
    ];
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${client_domain}/user/success`,
      cancel_url: `${client_domain}/user/cancel`,
    });
    const order = new Order({
      userId: req.user.id,
      sessionId: session.id,
      totalPrice: bookedCar?.totalAmount,
      carId: bookedCar?.carId?._id,
      dealerId: bookedCar?.carId?.dealer,
    });
    await order.save();

    return res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const userPayment = async (req, res, next) => {
  try {
    const { user } = req;
    const paymentData = await Order.findOne({ userId: user.id })
      .populate("carId")
      .populate("userId");
    if (!paymentData) {
      return res.status(404).json({ success: false, message: "no payment" });
    } else {
      return res
        .status(200)
        .json({
          success: true,
          message: "payment data fetched",
          data: paymentData,
        });
    }
  } catch (error) {
    console.log(error);
  }
};
export const checkPayment = async (req, res, next) => {
  try {
    const paymentdata = await Order.find().populate("userId").populate("carId");
    if (!paymentdata) {
      return res
        .status(404)
        .json({ message: "payment data not available", data: paymentdata });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "payment data", data: paymentdata });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const deletePayment = async (req, res, next) => {
  {
    try {
      const paymentId = req.params.id;

      const deletePayment = await Order.findByIdAndDelete(paymentId);
      if (!deletePayment) {
        return res
          .status(404)
          .json({ success: false, message: "no payment", data: deletePayment });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "payment deleted" });
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
};
