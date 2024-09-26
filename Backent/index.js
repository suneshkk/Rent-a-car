import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './confiq/dbConnection.js';
import cors from 'cors';
import { errorHandle } from './util/errorHandle.js';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/index.js';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

// cors controler setup
const corsSetup = {
    origin: 'http://localhost:5000', // Allow all origins; you can specify specific origins instead
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsSetup));

// app.get('/', (req, res) => {
//     res.send({ message: 'CORS is working!' });
// });

dotenv.config();
connectDB();

// rout setup
app.get('/', (req, res) => {
    res.send({ message: "heloworld!" });
})

app.use("/api", apiRouter);
app.use(errorHandle);

app.all("*", (req, res) => {
    res.status(404).json({ message: "end point does not exist" });
});


//express  port connection code
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
