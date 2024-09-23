// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../../utils/customErrors";

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set the status code depending on the type of error (default to 500)
  const statusCode = err.statusCode || 500;

  // Respond with a generic error message for client-side
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong!", // Custom error message or generic message
    // Only include stack trace in non-production environments
    error: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
