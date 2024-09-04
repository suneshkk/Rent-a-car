import express from 'express';
import { userAuth } from '../../middlewares/userAuth.js';
import { createPayment, getAllPayments, getPaymentById, updatePaymentStatus, deletePayment } from '../../controller/paymentController.js';



const router = express.Router();

router.post('/payment', userAuth, createPayment);
router.get('/payments', userAuth, getAllPayments);
router.get('/payments/:id', userAuth, getPaymentById);
router.put('/payments/:id', userAuth, updatePaymentStatus);
router.delete('/payments/:id', userAuth, deletePayment);


export {router as paymentRouter};

