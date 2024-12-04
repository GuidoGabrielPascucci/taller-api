import { ResultSetHeader } from 'mysql2/promise';
import { IUser } from "../interfaces/IUser.js";
import { UserInput, Role, User, UserQueryResult } from "../schemas/user-schema.js";
import { pool } from "../database/db-config.js";

export class UserModel implements IUser {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: Role

    constructor(
        id?: string,
        name?: string,
        lastname?: string,
        email?: string,
        password?: string,
        phoneNumber?: string,
        role?: Role,
    ) {
        this.id = id ?? ""
        this.name = name ?? ""
        this.lastname = lastname ?? ""
        this.email = email ?? ""
        this.password = password ?? ""
        this.phoneNumber = phoneNumber ?? ""
        this.role = role ?? 0
    }

    public async getAll(): Promise<User[] | boolean> {
        try {
            const [result] = await pool.query('SELECT * FROM users');
            const users: User[] = (result as User[]);
            if (users.length) {
                return users;
            }
            return false;
        }
        catch (e) {
            throw new Error('Error al obtener el listado de usuarios: ' + e);
        }
    }

    public async getOneByID(id: number): Promise<User | boolean> {
        try {
            const result = await pool.query(`SELECT * FROM users WHERE id = ?`, id);
            const user: User | undefined = (result[0] as User[])[0];
            return user !== undefined ? user : false;
        }
        catch (e) {
            throw new Error('Error al obtener un usuario: ' + e);
        }
    }

    public async getOneByEmail(email: string): Promise<User | null> {
        try {
            const result = await pool.query(`SELECT * FROM users WHERE email = ?`, email);

            // Si no existen registros, result[0] es un array vacío.
            const queryResult = result[0] as UserQueryResult[];

            // en un array vacío, si accedo a la posición 0 me devuelve undefined.
            const userResult = queryResult[0];

            let user: User | null = null;
            
            if (userResult) {
                const transformKey = (obj: Record<string, any>, oldKey: string, newKey: string): Record<string, any> => {
                    const { [oldKey]: value, ...rest } = obj;
                    return {
                        ...rest,
                        [newKey]: value,
                    };
                };

                const transformedResult = transformKey(userResult, "phone_number", "phoneNumber");

                // Convertimos el Buffer a string en `uuid`
                // if (transformedResult.uuid instanceof Buffer) {
                //     transformedResult.uuid = transformedResult.uuid.toString("utf-8"); // O el encoding que necesites
                // }
            
                // Ahora el objeto cumple con la estructura de `User`
                user = transformedResult as User;
            }

            return user;
        }
        catch (e) {
            console.log("Esta ingresando en el catch del getOneByEmail del MODELO")
            throw new Error('Error al obtener un usuario: ' + e);
        }
    }

    public async create(user: User): Promise<User | null> {
        try {
            const [result] = await pool.query(`
                INSERT INTO users (id, lastname, name, email, password, phone_number, role)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [user.uuid, user.lastname, user.name, user.email, user.password, user.phoneNumber, user.role]);

            return ('affectedRows' in result && result.affectedRows === 1) ? user : null;
        }
        catch (e) {
            // No dejar al descubierto, puede enviar información sensible de la db
            // Enviar la traza a un servicio interno para verlo más adelante
            // sendLog(e)
            throw new Error('Error creating new User: ' + e);
        }
    }

    public async update(input: User): Promise<User | boolean> {
        try {
            const [results] = await pool.query(`
        UPDATE users SET lastname = ?, name = ?, email = ?, password = ?, role = ?
        WHERE id = ?`,
                [input.lastname, input.name, input.email, input.password, input.role, input.uuid]);

            const resultSetHeader = (results as ResultSetHeader);

            if (resultSetHeader.affectedRows) {
                const [select_results] = await pool.query(`SELECT * FROM users WHERE id = ?`, input.uuid);
                const updatedUser = (select_results as User[])[0];
                return updatedUser;
            }

            return false;
        }
        catch (e) {
            throw new Error('Error updating User');
        }
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, id);
            return ('affectedRows' in result && result.affectedRows > 0);
        } catch (e) {
            throw new Error('Error removing a User');
        }
    }

    public async login() {
        // sea correcto el email y la contraseña
    }

    // public static async getOneById(id: number): Promise<Result> {
    //   const [result] = await connection.query(`SELECT * FROM users WHERE id = ?`, id);
    //   return result;
    // }

    // public static async getOneByEmail_FORMA_DOS(email: string): Promise<User | boolean> {
    //     const [result] = await connection.query(`SELECT * FROM users WHERE email = ?`, email);
    //     return result;
    // }


    // public static async getOneByUsername(username: string): Promise<Result> {
    //   const [result] = await connection.query(`SELECT * FROM users WHERE username = ?`, username);
    //   return result;
    // }

    // CON TUPLA
    // public static async getOne_tupla(input: [key: string, value: string | number]): Promise<Result> {

    //   const not_success_result = { success: false, data: null }

    //   if (input[0] === 'id' && typeof input[1] !== 'number') {
    //     return not_success_result;
    //   }

    //   const [result]: any = await connection.query(`SELECT * FROM users WHERE ? = ?`, [input[0], input[1]]);
    //   console.log(result);

    //   if (result.length) {
    //     return { success: true, data: result };
    //   }
    //   else {
    //     return not_success_result;
    //   }

    // }

    // // CON OBJETO
    // public static async getOne_obj(input: { key: string, value: string | number }): Promise<Result> {

    //   const not_success_result = { success: false, data: null }

    //   if (input.key === 'id' && typeof input.value !== 'number') {
    //     return not_success_result;
    //   }

    //   const [result]: any = await connection.query(`SELECT * FROM users WHERE ? = ?`, [input.key, input.value]);

    //   console.log(result);

    //   if (result.length) {
    //     return { success: true, data: result };
    //   }
    //   else {
    //     return not_success_result;
    //   }

    // }

    // public static async getSome(input: UserInput) {

    //   const [ result ] = await connection.query(`SELECT * FROM users WHERE id = ?`, id);
    //   return result;

    // }


    // public static async getByCountry(countries: UserInput) {

    //   const [ result ] = await connection.query(`SELECT * FROM users WHERE id = ?`, id);
    //   return result;

    // }
}