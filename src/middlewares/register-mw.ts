import { Request, Response, NextFunction } from "express";
import { ValidationService } from "../services/validation-service.js";

export const validateRegister = [
    sanitizeRegister
]

function sanitizeRegister(req: Request, res: Response, next: NextFunction) {
    if (!ValidationService.RegisterInput(req.body)) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: "Error al sanitizar el cuerpo de la petición - REGISTER"
        });
    }
    next();
}