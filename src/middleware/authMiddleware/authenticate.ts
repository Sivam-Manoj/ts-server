import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../../utils/tokenUtils";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedException } from "../../utils/customErrors"; // Import the custom error

export const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new UnauthorizedException("Access token missing");
    }

    try {
      const decoded = verifyAccessToken(token) as JwtPayload;
      req.user = decoded.userId;
      next();
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired access token");
    }
  }
);
