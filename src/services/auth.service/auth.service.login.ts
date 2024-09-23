import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { createTokens } from "../../utils/tokenUtils";
import Auth, { IAuthDocument } from "../../model/auth.model/authModel";
import {
  NotFoundException,
  BadRequestException,
} from "../../utils/customErrors";

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      throw new BadRequestException("Email and Password are required");
    }

    // Find the user and include the password field
    const newUser: IAuthDocument | null = await Auth.findOne({ email }).select(
      "+password"
    );

    // If no user is found, throw a NotFoundException
    if (!newUser) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    // Validate the password
    const isPasswordMatch = await newUser.checkPassword(password);

    // If the password doesn't match, throw an Unauthorized error
    if (!isPasswordMatch) {
      throw new BadRequestException("Invalid password");
    }

    // If password is valid, proceed to generate tokens and respond
    createTokens(newUser._id.toString(), res);

    res.status(200).json({
      message: "Login successful",

      user: { email: newUser.email, name: newUser.name },
    });
  }
);
