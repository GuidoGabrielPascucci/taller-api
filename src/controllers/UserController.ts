import { NextFunction, Request, Response } from "express";
import crypto from "node:crypto"
import bcrypt from "bcrypt";
import { IUser } from '../interfaces/IUser.js';
import { User, User_PublicData } from "../schemas/user-schema.js";
import { JWTController as JWT } from "./JWTController.js";
import { formatUuid } from "../utils/uuid.utils.js"
import { EmailDoesNotExistError } from "../errors/EmailDoesNotExistError.js";
import { PasswordDoesNotMatchError } from "../errors/PasswordDoesNotMatchError.js";

const ACCESS_TOKEN_NAME = "access_token"

export class UserController {
    private userModel: IUser;

    constructor(model: IUser) {
        this.userModel = model;
    }

    public getAll = async (req: Request, res: Response) => {

        const result: User[] | boolean = await this.userModel.getAll();

        if (typeof result !== 'boolean') {

            const users: User[] = result;

            // modificar UUID de tipo ¿Buffer? a tipo string formateado.

            return res.status(200).json({
                success: true,
                status: 200,
                message: `${users.length} records fetched`,
                data: users
            });
        }

        return res.status(404).json({
            success: false,
            status: 404,
            message: `No records fetched`,
            data: null
        });
    }

    public getOne = async (req: Request, res: Response) => {
        const id_str: string = req.params.id;
        const regexp = /^[1-9][0-9]*$/;
        const { id, email, username } = req.body;

        if (id) {
            // validaciones para ID ingresado
        }

        if (email) {
            // validaciones para EMAIL ingresado
        }

        if (username) {
            // validaciones para USERNAME ingresado
        }

        if (regexp.test(id_str)) {
            const id: number = parseInt(id_str);

            if ((!isNaN(id)) && (id > 0 && id < 99999999999)) {
                const result: User | boolean = await this.userModel.getOneByID(id);

                if (typeof result !== 'boolean') {

                    const user: User = result;

                    return res.status(200).json({
                        success: true,
                        status: 200,
                        message: `Found`,
                        data: user
                    });

                }
            }
        }

        res.status(404).json({
            success: false,
            status: 404,
            message: `Not found`,
            data: null
        });
    }

    public create = async (req: Request, res: Response) => {
        const userData = req.body;
        const uuid = crypto.randomUUID();
        const uuidBuffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const userToBeCreate: User = {
            uuid: uuidBuffer,
            ...userData,
            password: hashedPassword
        };
        const newUser: User | null = await this.userModel.create(userToBeCreate);
        if (newUser) {
            const { password, role, ...newUserPublicData } = newUser;
            //newUserPublicData.uuid = uuid;
            return res.status(200).json({
                success: true,
                status: 200,
                message: `User created`,
                data: newUserPublicData
            });
        }
        else {
            return res.status(400).json({
                success: false,
                status: 404,
                message: `User not created`,
                data: null
            });
        }
    }

    public update = async (req: Request, res: Response) => {

        const { lastname, name, email, password, phoneNumber, role, id } = req.body;

        // aqui irian las validaciones !!!

        const data: any = {
            lastname,
            name,
            email,
            password,
            phoneNumber,
            role,
            id
        };

        const result: any = await this.userModel.update(data);

        if (result.affectedRows) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: `User updated`,
            });
        }

        res.status(400).json({
            success: false,
            status: 404,
            message: `Not updated`,
        });

    }

    public delete = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        // Comprobar que el ID sea un UUID válido! --> modulo `uuid` de npm
        const deleted: boolean = await this.userModel.delete(id);
        if (deleted) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: `Deleted succesfully`
            });
        }
        else {
            return res.status(404).json({
                success: false,
                status: 404,
                message: `Not deleted`,
            });
        }

        // const id_str: string = req.body.id;
        // const regexp = /^[1-9][0-9]*$/;

        // if (regexp.test(id_str)) {
        //     const id: number = parseInt(id_str);

        //     if ((!isNaN(id)) && (id > 0 && id < 99999999999)) {
        //         const deleted: boolean = await this.userModel.delete(id);

        //         if (deleted) {
        //             return res.status(200).json({
        //                 success: true,
        //                 status: 200,
        //                 message: `Deleted succesfully`
        //             });
        //         }
        //     }
        // }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;
        const password = req.body.password;
        
        try {
            const user: User | null = await this.userModel.getOneByEmail(email);
            if (!user) {
                throw new EmailDoesNotExistError();
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch){
                throw new PasswordDoesNotMatchError();
            }

            const uuidString = user.uuid.toString('hex');
            const formattedUuid = formatUuid(user.uuid);
            const accessToken = JWT.GenerateAccessToken({ uuid: user.uuid, email })

            const userResponse = {
                uuid: formattedUuid,
                lastname: user.lastname,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }

            return res
                .cookie(ACCESS_TOKEN_NAME, accessToken, {
                    path: '/',
                    httpOnly: true,
                    secure: false
                })
                .status(200)
                .json(userResponse);
        }
        catch (err: unknown) {

            // if (err instanceof EmailDoesNotExistError) {
            //     console.log(`e: ${err}`);
            // }

            // if (err instanceof PasswordDoesNotMatchError) {
            //     console.log(`e: ${err}`);
            // }

            next(err);
        }
    }

    public logout = async (req: Request, res: Response) => {
        return res
            .clearCookie(ACCESS_TOKEN_NAME)
            .send({ message: "Logout successfully" })
    }

    // .cookie("otra_cookie_example", "este es mi valor de la cookie", {
    //     // httpOnly: false,
    //     // maxAge: 1000 * 60 * 60,
    //     // path: '/'
    //     maxAge: 900000,
    //     secure: true,
    //     sameSite: 'none'  // 'Strict', 'Lax', 'None'
    // })
}

// se podria usar RSA si no para que en el front puedan cifrar... ??
// https
// si alguien tiene acceso a tu cookie, tiene acceso a tu ordenador físico... estas jodio
// Cifrado asimetrico
// Autenticación en dos pasos