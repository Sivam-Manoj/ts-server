import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/" });
  res.status(200).json({ message: "User logged out successfully" });
});
