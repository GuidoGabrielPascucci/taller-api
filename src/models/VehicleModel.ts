import { IVehicle } from "../interfaces/IVehicle.js";
import { VehicleInput, Fuel, Transmition } from "../schemas/vehicle-schema.js";
import { pool } from "../database/db-config.js";
import { ResultSetHeader } from "mysql2";

export class Vehicle implements IVehicle {
    id: string;
    marca: string;
    modelo: string;
    año: number;
    color: string;
    kilometraje: number;
    tipoCombustible: Fuel;
    transmision: Transmition;
    numeroDePuertas: number;

    constructor(
        id?: string,
        marca?: string,
        modelo?: string,
        año?: number,
        color?: string,
        kilometraje?: number,
        tipoCombustible?: Fuel,
        transmision?: Transmition,
        numeroDePuertas?: number
    ) {
        this.id = id ?? ""
        this.marca = marca ?? ""
        this.modelo = modelo ?? ""
        this.año = año ?? 0
        this.color = color ?? ""
        this.kilometraje = kilometraje ?? 0
        this.tipoCombustible = tipoCombustible ?? 0
        this.transmision = transmision ?? 0
        this.numeroDePuertas = numeroDePuertas ?? 0
    }

    public async getAll(): Promise<Vehicle[] | boolean> {
        try {
            const [result] = await pool.query('SELECT * FROM Vehicles');
            const vehicles: Vehicle[] = (result as Vehicle[]);
            if (vehicles.length) {
                return vehicles;
            }
            return false;
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }

    public async getOne(id: number): Promise<Vehicle | boolean> {
        try {
            const result = await pool.query(`SELECT * FROM Vehicles WHERE id = ?`, id);
            const Vehicle: Vehicle | undefined = (result[0] as Vehicle[])[0];
            return Vehicle !== undefined ? Vehicle : false;
        }
        catch (e) {
            throw new Error('Error, el programa se cerrará !');
        }
    }

    public async create(input: VehicleInput): Promise<Vehicle | boolean> {

        // CREAR EL ID CON `bcrypt`
        const id = "sffsfsfsfsfsagfsf"

        try {
            const [result] = await pool.query(`
        INSERT INTO Vehicles (id, marca, modelo, año, color, kilometraje, tipoCombustible, transmision)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [id, input.marca, input.modelo, input.año, input.color, input.kilometraje, input.tipoCombustible, input.transmision]);

            let insertedId = 0;

            if ('affectedRows' in result && result.affectedRows > 0) {
                insertedId = result.insertId;
            }

            if (insertedId) {
                const [select_results] = await pool.query(`SELECT * FROM Vehicles WHERE id=${insertedId}`);
                const newVehicle = (select_results as Vehicle[])[0];
                return newVehicle;
            }
            else {
                return false;
            }
        }
        catch (e) {
            // No dejar al descubierto, puede enviar información sensible de la db
            // Enviar la traza a un servicio interno para verlo más adelante
            // sendLog(e)
            throw new Error('Error creating new User');
        }
    }

    public async update(input: VehicleInput): Promise<Vehicle | boolean> {
        // Actualizar según qué dato? el ID o la PLACA del vehículo? 
        // RECUPERAR ESTE DATO por ejemplo el ID
        const id = "fsf";
        try {
            const [result] = await pool.query(`
                    UPDATE Vehicles SET
                    marca = ?,
                    modelo = ?,
                    año = ?,
                    color = ?,
                    kilometraje = ?,
                    tipoCombustible = ?,
                    transmision = ?
                    WHERE id = ?`,
                [input.marca, input.modelo, input.año, input.color, input.kilometraje, input.tipoCombustible, input.transmision, id]);

            const resultSetHeader = (result as ResultSetHeader);

            if (resultSetHeader.affectedRows) {
                const [select_results] = await pool.query(`SELECT * FROM Vehicles WHERE id = ?`, id);
                const updatedVehicle = (select_results as Vehicle[])[0];
                return updatedVehicle;
            }

            return false;
        }
        catch (e) {
            throw new Error('Error updating User');
        }
    }

    // delete por ID o por PLACA del vehículo? (el ID no es numérico)
    public async delete(id: number): Promise<boolean> {
        try {
            const [result] = await pool.query(`DELETE FROM Vehicles WHERE id = ?`, id);
            return ('affectedRows' in result && result.affectedRows > 0);
        } catch (e) {
            throw new Error('Error removing a User');
        }
    }

    public toString(): string {
        return `${this.marca} ${this.modelo} (${this.año}), Color: ${this.color}, Kilometraje: ${this.kilometraje} km, Combustible: ${this.tipoCombustible}, Transmisión: ${this.transmision}, Puertas: ${this.numeroDePuertas}`;
    }

    // public static async getOneById(id: number): Promise<Result> {
    //   const [result] = await connection.query(`SELECT * FROM Vehicles WHERE id = ?`, id);
    //   return result;
    // }

    // public static async getOneByEmail(email: string): Promise<Result> {
    //   const [result] = await connection.query(`SELECT * FROM Vehicles WHERE email = ?`, email);
    //   return result;
    // }

    // public static async getOneByVehiclename(Vehiclename: string): Promise<Result> {
    //   const [result] = await connection.query(`SELECT * FROM Vehicles WHERE Vehiclename = ?`, Vehiclename);
    //   return result;
    // }

    // CON TUPLA
    // public static async getOne_tupla(input: [key: string, value: string | number]): Promise<Result> {

    //   const not_success_result = { success: false, data: null }

    //   if (input[0] === 'id' && typeof input[1] !== 'number') {
    //     return not_success_result;
    //   }

    //   const [result]: any = await connection.query(`SELECT * FROM Vehicles WHERE ? = ?`, [input[0], input[1]]);
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

    //   const [result]: any = await connection.query(`SELECT * FROM Vehicles WHERE ? = ?`, [input.key, input.value]);

    //   console.log(result);

    //   if (result.length) {
    //     return { success: true, data: result };
    //   }
    //   else {
    //     return not_success_result;
    //   }

    // }

    // public static async getSome(input: VehicleInput) {

    //   const [ result ] = await connection.query(`SELECT * FROM Vehicles WHERE id = ?`, id);
    //   return result;

    // }


    // public static async getByCountry(countries: VehicleInput) {

    //   const [ result ] = await connection.query(`SELECT * FROM Vehicles WHERE id = ?`, id);
    //   return result;

    // }

    // public async create(input: Vehicle): Promise<Vehicle | boolean> {
    //     try {
    //         const [result] = await pool.query(`
    //     INSERT INTO Vehicles (lastname, name, Vehiclename, email, password, country, role)
    //       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    //             [input.lastname, input.name, input.Vehiclename, input.email, input.password, input.country, input.role]);

    //         let insertedId = 0;

    //         if ('affectedRows' in result && result.affectedRows > 0) {
    //             insertedId = result.insertId;
    //         }

    //         if (insertedId) {
    //             const [select_results] = await pool.query(`SELECT * FROM Vehicles WHERE id=${insertedId}`);
    //             const newVehicle = (select_results as Vehicle[])[0];
    //             return newVehicle;
    //         }
    //         else {
    //             return false;
    //         }
    //     }
    //     catch (e) {
    //         // No dejar al descubierto, puede enviar información sensible de la db
    //         // Enviar la traza a un servicio interno para verlo más adelante
    //         // sendLog(e)
    //         throw new Error('Error creating new Vehicle');
    //     }
    // }

    // public async update(input: Vehicle): Promise<Vehicle | boolean> {
    //     try {
    //         const [results] = await pool.query(`
    //     UPDATE Vehicles SET lastname = ?, name = ?, Vehiclename = ?, email = ?, password = ?, country = ?, role = ?
    //     WHERE id = ?`,
    //             [input.lastname, input.name, input.Vehiclename, input.email, input.password, input.country, input.role, input.id]);

    //         const resultSetHeader = (results as ResultSetHeader);

    //         if (resultSetHeader.affectedRows) {
    //             const [select_results] = await pool.query(`SELECT * FROM Vehicles WHERE id = ?`, input.id);
    //             const updatedVehicle = (select_results as Vehicle[])[0];
    //             return updatedVehicle;
    //         }

    //         return false;
    //     }
    //     catch (e) {
    //         throw new Error('Error updating Vehicle');
    //     }
    // }

    // public async delete(id: number): Promise<boolean> {
    //     try {
    //         const [result] = await pool.query(`DELETE FROM Vehicles WHERE id = ?`, id);
    //         return ('affectedRows' in result && result.affectedRows > 0);
    //     } catch (e) {
    //         throw new Error('Error removing a Vehicle');
    //     }
    // }


    // getOne(id: number): Promise<IVehicle | boolean>;
    // create(input: IVehicle): Promise<IVehicle | boolean>;
    // update(input: IVehicle): Promise<IVehicle | boolean>;
    // delete(id: number): Promise<boolean>;
}