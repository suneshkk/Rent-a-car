import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './confiq/dbConnection.js';
import cors from 'cors';
import { errorHandle } from './util/errorHandle.js';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/index.js';


dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use(cookieParser());


// cors controler setup
const corsSetup = {
    origin: 'http://localhost:5000', // Allow all origins; you can specify specific origins instead
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsSetup));

// rout setup
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use("/api",apiRouter);

app.use(errorHandle);

//express  port connection code
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
