import { Request, Response, NextFunction } from "express";
import { EmailDoesNotExistError } from "../errors/EmailDoesNotExistError.js";
import { PasswordDoesNotMatchError } from "../errors/PasswordDoesNotMatchError.js";

export function loginErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    const objError = {
        success: false,
        status: 401, // Unauthorized
        errorMessage: ''
    }

    if (err instanceof EmailDoesNotExistError || err instanceof PasswordDoesNotMatchError) {
        objError.errorMessage = err.message;
        return res.status(401).json(objError);
    }
    else {
        objError.errorMessage = "No sé qué es lo que falló. Verificar instancia de error lanzada"; // remover
        return res.status(401).json(objError);
    }
}