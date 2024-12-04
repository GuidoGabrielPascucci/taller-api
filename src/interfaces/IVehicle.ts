import { Fuel, Transmition } from "../schemas/vehicle-schema";

export interface IVehicle {
    id: string;
    marca: string;
    modelo: string;
    año: number;
    color: string;
    kilometraje: number;
    tipoCombustible: Fuel
    transmision: Transmition
    toString(): string;
    getAll(): Promise<IVehicle[] | boolean>;
    getOne(id: number): Promise<IVehicle | boolean>;
    create(input: any): Promise<IVehicle | boolean>; // cambiar tipo any
    update(input: any): Promise<IVehicle | boolean>; // cambiar tipo any
    delete(id: number): Promise<boolean>;
}