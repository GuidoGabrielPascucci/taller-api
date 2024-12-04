import { User, UserInput, Role } from "../schemas/user-schema.js";

export interface IUser {
    // id: string;
    // name: string;
    // lastname: string;
    // email: string;
    // password: string;
    // phoneNumber: string;
    // role: Role;
    getAll(): Promise<User[] | boolean>;
    getOneByID(id: number): Promise<User | boolean>;
    getOneByEmail(email: string): Promise<User | null>;
    create(input: User): Promise<User | null>;
    update(input: any): Promise<User | boolean>;       // CAMBIAR TIPO ANY
    delete(id: string): Promise<boolean>;
}

// public static async getOneById(id: number)
// public static async getOneByEmail(email: string)
// public static async getOneByUsername(username: string)
// CON TUPLA
// async getOne_tupla(input: [key: string, value: string | number]): Promise<Result>
// CON OBJETO
// static async getOne_obj(input: { key: string, value: string | number }): Promise<Result>
// static async getSome(input: UserInput)
// static async getByCountry(countries: UserInput)