import { paymentSchema } from "../model/paymentModel.js";


export const createPayment = async (req, res, next) => {

    try {
        const { rental, amount, paymentDate, paymentMethod, status } = req.body;

        //validate the input data
        if (!amount || !rental || !paymentDate || !paymentMethod) {
            return res.status(400).json({ success: false, message: "All fields required." });

        }
        //creating new schema
        const newPayment = new paymentSchema({
            rental,
            amount,
            paymentDate,
            paymentMethod,
            status
        });

        await newPayment.save();
        // successfull 
        return res.status(201).json({ success: true, message: "Payment created successfully", data: newPayment });


    } catch (error) {
        console.log(error);
        return next(error);
    };
};

//get all payment

export const getAllPayments = async (req, res, next) => {
    try {
        // Retrieve all payments from the database
        const payments = await paymentSchema.find();
        // Return a success response with the list of payments
        return res.status(200).json({ success: true, message: "Payments retrieved successfully", data: payments });


    } catch (error) {
        console.log(error);
        return next(error);
    };
};

// get payment by id
export const getPaymentById = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const payment = await paymentSchema.findById(paymentId);

        // Check if paymment exists

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        // Return the payment details
        return res.status(200).json({ success: true, message: "Payment fetched successfully", data: payment });



    } catch (error) {
        console.log(error);
        return next(error);
    };
};


export const updatePaymentStatus = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the payment ID from the request parameters
        const { status } = req.body; // Get the new status from the request body

        // Validate the status input
        const validStatuses = ['Pending', 'Completed', 'Failed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        // Find the payment by ID and update its status
        const updatedPayment = await Payment.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return the updated document and run validation
        );

        // If payment not found
        if (!updatedPayment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        // Return a success response with the updated payment
        return res.status(200).json({ success: true, message: "Payment status updated successfully", data: updatedPayment });

    } catch (error) {
        console.error( error);
        return next(error);
    }
};



export const deletePayment = async (req, res, next) => {
    try {
        const { payId } = req.params; // Get the payment ID from the request parameters

        // Find and delete the payment by ID
        const deletedPayment = await Payment.findByIdAndDelete(payId);

        // If payment not found
        if (!deletedPayment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        // Return a success response
        return res.status(200).json({ success: true, message: "Payment deleted successfully", data: deletedPayment });

    } catch (error) {
        console.error( error);
        return next(error);
    }
};

