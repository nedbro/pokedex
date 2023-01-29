import { Request, Response, NextFunction } from 'express';
import { Result, ValidationChain, ValidationError, validationResult, query } from "express-validator";
import { AppError } from "./AppError";

export const queryNameValidator: ValidationChain = query('name').isString().trim().not().isEmpty().escape();


export const validateInput = (req: Request, res: Response, next: NextFunction): void => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage: string = Object.entries(errors.mapped()).map(entrySet => `${entrySet[0]}: ${entrySet[1].msg}`).join(",");
        next(new AppError(400, errorMessage));
    }
}