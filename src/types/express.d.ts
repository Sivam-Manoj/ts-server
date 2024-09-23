// src/types/express.d.ts

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload; // Adjust the type according to your JWT payload type
    }
  }
}
