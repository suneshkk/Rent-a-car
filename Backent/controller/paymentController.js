import { Order } from "../model/paymentModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const client_domain = process.env.CLIENT_DOMAIN;



export const payment = async (req, res, next) => {
    try {
        const { bookingData } = req.body;

        const lineItems = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: bookingData?.carId?.carName,
                        images: [bookingData?.carId?.image],
                    },
                    unit_amount: Math.round(bookingData?.totalAmount * 100),
                },
                quantity: 1,
            }];
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
            totalPrice: bookingData?.totalAmount,
            carId: bookingData?.carId?._id
        });
        await order.save();

        return res.json({ success: true, sessionId: session.id });




    } catch (error) {
        console.log(error);
        return next(error);
    };
};

export const checkPayment = async (req, res, next) => {
    try {
        // const user = req.params.id;
        // console.log("dat++++++++",user)

        const paymentdata = await Order.find()
        if (!paymentdata || paymentdata == 0) {
            return res.status(404).json({ message: "payment data not available", data: paymentdata });
        };


    } catch (error) {
        console.log(error);
        return next(error);
    };
};