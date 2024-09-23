import { Schema, model, Document } from "mongoose";
import * as bcryptjs from "bcryptjs";
import crypto from "crypto";

// Interface for TypeScript typing
export interface IAuthDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  checkPassword(givenPassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generatePasswordResetToken(): string;
  passwordChangedAt: Date;
  passwordResetToken: String;
  passwordResetExpires: Date;
}

const authSchema = new Schema<IAuthDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      lowercase: true,
      index: true, // Create an index on email to speed up searches
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Do not return the password in any query by default
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date, // Field to track password changes
    passwordResetToken: String, // For reset password functionality
    passwordResetExpires: Date, // Expiration time for reset token
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Custom password validation
authSchema.path("password").validate(function (value: string) {
  return /(?=.*[A-Z])(?=.*[0-9])/.test(value);
}, "Password must contain at least one uppercase letter and one number");

// Pre-save hook for password hashing
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcryptjs.genSalt(12); // Use a stronger salt factor
    this.password = await bcryptjs.hash(this.password, salt);
    this.passwordChangedAt = new Date(); // Update password change time
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
authSchema.methods.checkPassword = async function (
  givenPassword: string
): Promise<boolean> {
  return await bcryptjs.compare(givenPassword, this.password);
};

// Password reset token generation
authSchema.methods.generatePasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the reset token and set it with expiration time
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

  return resetToken;
};

// Ensure that only valid, unique emails exist
authSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email address must be unique."));
  } else {
    next(error);
  }
});

const Auth = model<IAuthDocument>("Auth", authSchema);
export default Auth;
