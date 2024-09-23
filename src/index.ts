import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { ConnectServerWithDatabase } from "./config/ConnectServerWithDatabase";
import { errorHandler } from "./middleware/errorMiddleware/errorHanlder";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes/auth.routes";
const app = express();

//inbuilt middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/auth", authRoutes);

//custom error handler middleware
app.use(errorHandler);

//connect server and database
ConnectServerWithDatabase(app);
