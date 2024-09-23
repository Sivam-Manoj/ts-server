import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BadRequestException } from "./customErrors";

// Load environment variables
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  NODE_ENV,
} = process.env;

// Generate access token and set as cookie
export const generateAccessToken = (userId: string, res: Response) => {
  try {
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET as string, {
      expiresIn: ACCESS_TOKEN_EXPIRY || "15m", // Fallback value
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: NODE_ENV === "production", // Use secure cookies in production
      sameSite: NODE_ENV === "production" ? "strict" : "lax", // Adjust cookie policy based on environment
      path: "/", // Specify the path
    });
  } catch (error: any) {
    throw new Error("Failed to generate access token");
  }
};

// Generate refresh token and set as cookie
export const generateRefreshToken = (userId: string, res: Response) => {
  try {
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET as string, {
      expiresIn: REFRESH_TOKEN_EXPIRY || "7d", // Fallback value
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: NODE_ENV === "production", // Use secure cookies in production
      sameSite: NODE_ENV === "production" ? "strict" : "lax",
      path: "/", // Specify the path
    });
  } catch (error: any) {
    throw new Error("Failed to generate refresh token");
  }
};

// Create both access and refresh tokens
export const createTokens = async (userId: string, res: Response) => {
  try {
    generateAccessToken(userId, res);
    generateRefreshToken(userId, res);
  } catch (error: any) {
    throw new BadRequestException("token creation failed");
  }
};

// Verify access token
export const verifyAccessToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET as string);
  } catch (error: any) {
    throw new Error("Invalid or expired access token");
  }
};

// Verify refresh token
export const verifyRefreshToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET as string);
  } catch (error: any) {
    throw new Error("Invalid or expired refresh token");
  }
};
