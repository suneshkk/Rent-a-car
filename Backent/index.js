import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './confiq/dbConnection.js';
import cors from 'cors';
import { errorHandle } from './util/errorHandle.js';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

// const corsSetup = {
//     origin: ['http://localhost:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true // Allow credentials like cookies, authorization headers

// };
// Updated CORS setup for both local and deployed environments
const corsSetup = {
    origin: ['http://localhost:5173', 'https://rent-a-car-frontend.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials like cookies, authorization headers
};
app.use(cors(corsSetup));

connectDB();

app.get('/', (req, res) => {
    res.send("helloworld!");
});
app.use("/api", apiRouter);
app.use(errorHandle);

app.all("*", (req, res) => {
    res.status(404).json({ message: "endpoint does not exist" });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
