import { IUser } from "../interfaces/IUser"
import { IVehicle } from "../interfaces/IVehicle"

export type AppModels = {
    User: IUser,
    Vehicle: IVehicle
};

export type Result = {
    success: boolean,
    data: any
};