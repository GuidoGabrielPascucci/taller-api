import { Request, Response, NextFunction } from "express";
import { ValidationService } from "../services/validation-service.js";

// import jwt from "jsonwebtoken";

// function isAuthenticated(req: Request, res: Response, next: NextFunction) {
//     if (req.session && req.session.userId) {
//         return next();
//     } else {
//         res.redirect('/login');
//     }
// }


// function isAuthenticated2(req.session.userId) {
//         return next();
//     } else {
//         res.redirect('/login');
//     }
// }



// export const validateLogin = [
//     validateLoginInput,
// ]


// export function setCookie(req: Request, res: Response, next: NextFunction) {

// }

export const validateLogin = [
    sanitizeLogin,
    authenticate
]

function sanitizeLogin(req: Request, res: Response, next: NextFunction) {

    const email: string | undefined = req.body.email;
    const password: string | undefined = req.body.password;

    // email?.trim()

    const objError = {
        success: false,
        status: 400,
        message: ''
    }

    if (!email || !password) {
        objError.message = "Error, debes enviar tanto email como contraseña para poderte loguear";
        return res.status(400).json(objError);
    }

    const emailLength = email.length;
    const passwordLength = password.length;

    if (emailLength < 8 || emailLength > 50 || !email.includes('@') || email.indexOf('@') === 0 || email.indexOf('@') === emailLength-1) {
        objError.message = "Error, el formato de email no es correcto. Por favor ingrese un email similar al siguiente formato de ejemplo: 'my_email_account@foo.bar'";
        return res.status(400).json(objError);
    }

    if (passwordLength < 8 || passwordLength > 16) {
        objError.message = "Error, el formato de contraseña no es correcto. Por favor ingrese una contraseña de 8 a 16 caracteres";
        return res.status(400).json(objError);
    }

    // if (!ValidationService.LoginInput(req.body)) {
    //     return res.status(400).json({
    //         success: false,
    //         status: 400,
    //         message: "Error"
    //     });
    // }

    next();
}

function authenticate(req: Request, res: Response, next: NextFunction) {
    // console.log(req.cookies)
    // const token = req.cookies.access_token;
    // let data = null;
    // req.session = { user: null }
    try {
        // data = jwt.verify(token, claveSecreta)
        // req.session.user = data
    } catch {}
    next();
}