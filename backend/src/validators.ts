import { Request, Response } from 'express';
import { Result, ValidationError, validationResult } from "express-validator";
import { AppError } from "./AppError";

export const validateInput = (req: Request, res: Response): void => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage: string = Object.entries(errors.mapped()).map(entrySet => `${entrySet[0]}: ${entrySet[1].msg}`).join(",");
        throw new AppError(400, errorMessage);
    }
}