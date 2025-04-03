import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./confiq/dbConnection.js";
import cors from "cors";
import { errorHandle } from "./util/errorHandle.js";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/index.js";

dotenv.config();
// Creates an instance of an Express application, which provides methods to define routes,
// middleware, and other server behaviors. javascript  Copy code
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads, allowing the server to handle requests with JSON data in the body.javascript Copy code
app.use(express.json());

// Adds cookie-parser middleware to the app, enabling it to read cookies from incoming requests.
app.use(cookieParser());

// const corsSetup = {
//     origin: ['http://localhost:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true // Allow credentials like cookies, authorization headers

// };
// Updated CORS setup for both local and deployed environments
const corsSetup = {
  origin: ["https://rent-a-car-frontend.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials like cookies, authorization headers
};
app.use(cors(corsSetup));

connectDB();

app.get("/", (req, res) => {
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

// API. application programming interface
// HTTP hypertext transfer protocol
