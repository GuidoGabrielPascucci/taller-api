import { z } from "zod"

export const DB = {
    MAX_LENGTH_LASTNAME: 50,
    MAX_LENGTH_NAME: 50,
    MAX_LENGTH_EMAIL: 100,
    MAX_LENGTH_PASSWORD: 50,
    MAX_LENGTH_PHONE_NUMBER: 50,
    MAX_LENGTH_ROLE: 20,
}

export const register_schema = z.object({
    lastname: z.string().max(DB.MAX_LENGTH_LASTNAME),
    name: z.string().max(DB.MAX_LENGTH_NAME),
    email: z.string().email().max(DB.MAX_LENGTH_EMAIL),
    password: z.string().max(DB.MAX_LENGTH_PASSWORD),
    phoneNumber: z.string().max(DB.MAX_LENGTH_PHONE_NUMBER),
    role: z.enum(['admin', 'employee', 'client'])
});

export type UserInput = z.infer<typeof register_schema>;
export type User = UserInput & { uuid: Buffer };

export enum Role {
    admin,
    employee,
    client
}

// type para información pública del USER
// no enviar password JAMAS

export type User_PublicData = Omit<User, 'password' | 'role'>


export type UserQueryResult = {
    uuid: Buffer,
    lastname: string,
    name: string,
    email: string,
    password: string,
    phone_number: string,
    role: string,
}