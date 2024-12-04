import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { Request, Response, NextFunction } from 'express';

export class JWTController {

    public static GenerateAccessToken(payload: any) {
        const tokenSignOptions = {
            expiresIn: '1h'
        }
        const accessToken = jwt.sign(payload, SECRET_KEY, tokenSignOptions);
        return accessToken
    }

    public static VerificarToken(req: Request, res: Response, next: NextFunction) {
        const token_input = jwt.verify('TOKEN', SECRET_KEY);
    }
}