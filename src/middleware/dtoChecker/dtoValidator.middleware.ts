// src/middlewares/validateRequest.ts
import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "../../utils/customErrors";

export const validateRequest = (DTOClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Convert plain request body to an instance of the DTOClass
    const dtoInstance = plainToInstance(DTOClass, req.body);

    // Validate the DTO instance
    const errors = await validate(dtoInstance);

    // If validation fails, throw a BadRequestException
    if (errors.length > 0) {
      const validationErrors = errors.map((err) =>
        Object.values(err.constraints || {}).join(", ")
      );
      return next(new BadRequestException(validationErrors.join("; ")));
    }

    // If validation succeeds, proceed to the next middleware/controller
    next();
  };
};
