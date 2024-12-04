import { z } from "zod"

export type VehicleInput = {
    marca: string;
    modelo: string;
    año: number;
    color: string;
    kilometraje: number;
    tipoCombustible: Fuel
    transmision: Transmition
}

export enum Fuel {
    Gasolina,
    Diesel,
    Eléctrico,
    Híbrido
}

export enum Transmition {
    Manual,
    Automática
}




export function ValidateInput(input: any) {
    // implementar VALIDACIÓN ZOD
    // return USER_SCHEMA_CREATE.safeParse(input);

    // Remplazar esto por la validación de ZOD
    return {
        success: true,
        data: {},
        error: {
            message: "el mensaje del error"
        }
    };
}