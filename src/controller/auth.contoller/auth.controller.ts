import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { login } from "../../services/auth.service/auth.service.login";
import { register } from "../../services/auth.service/auth.service.register";

// Define the logout function
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("accesstoken");
  res.clearCookie("refreshtoken");
  res.status(200).json({ message: "Logged out successfully" });
});

// Login handler
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return login(req, res, next);
};

// Register handler
export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return register(req, res, next);
};

// Logout handler (corrected)
export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return logout(req, res, next); 
};
