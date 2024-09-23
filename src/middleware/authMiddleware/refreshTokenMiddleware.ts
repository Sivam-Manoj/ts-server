import { Request, Response, NextFunction } from "express";
import { verifyRefreshToken, createTokens } from "../../utils/tokenUtils";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedException } from "../../utils/customErrors"; // Import the custom error

export const refreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new UnauthorizedException("Refresh token missing");
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as JwtPayload;
    const userId = decoded.userId;

    // Generate new tokens and set them in cookies
    await createTokens(userId, res);

    // Optionally return the new access token in the response body
    res.json({ message: "Tokens refreshed successfully" });
  } catch (err) {
    // Pass the error to the next middleware (e.g., error-handling middleware)
    next(err);
  }
};
