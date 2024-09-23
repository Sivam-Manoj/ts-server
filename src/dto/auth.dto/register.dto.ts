// src/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class registerDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "Invalid email address" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @IsNotEmpty()
  @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
  password: string;
}
