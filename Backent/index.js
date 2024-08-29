import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './confiq/dbConnection.js';
import cors from 'cors';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const port = process.env.PORT;

// cors controler setup
const corsSetup = {
    origin: 'http://localhost:5000/', // Allow all origins; you can specify specific origins instead
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsSetup));

//express  port connection code
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
