import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createTokens } from "../../utils/tokenUtils";
import Auth, { IAuthDocument } from "../../model/auth.model/authModel"; // Ensure you import the IAuthDocument type
import { BadRequestException } from "../../utils/customErrors";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    throw new BadRequestException("All fields need to be filled.");
  }

  // Check if user already exists
  const oldUser = await Auth.findOne({ email });
  if (oldUser) {
    throw new BadRequestException("User already exists. Try to log in.");
  }

  // Create new user
  const newUser: IAuthDocument = new Auth({
    name,
    email,
    password,
  });

  await newUser.save();

  createTokens(newUser._id, res);
  // Respond with success message and user data (excluding password)
  const { password: _, ...userData } = newUser.toObject(); // Convert to plain object and omit password

  res
    .status(201)
    .json({ message: "User created successfully", user: userData });
});
