import express from "express";
import connectDB from "./config/connection.js";
import morgan from "morgan"
import logger from "./config/logger.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


//Routes
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
import addressRoute from "./routes/addressRoute.js"


dotenv.config()
const app=express()


connectDB(process.env.URI);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());




app.get("/", (req, res) => {
  res.send("Home...");
});
app.use("/auth", authRoute);
app.use("/user",userRoute);
app.use("/product",productRoute);
app.use("/cart",cartRoute);
app.use("/order", orderRoute);
app.use("/address",addressRoute);


//Logger

app.use((req, res) => {
  logger.warn(`404 - Page not found: ${req.originalUrl}`); 
  res.status(404).json({ title: "404", message: "Page not found" });
});

app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`); 
  res.status(500).json({ title: "Error", message: "Internal Server Error" });
});

export default app;
