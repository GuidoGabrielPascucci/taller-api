import { Request, Response } from 'express';
import { IVehicle } from '../interfaces/IVehicle.js';
import { ValidateInput } from "../schemas/vehicle-schema.js";

export class VehicleController {

    private vehicleModel: IVehicle;

    constructor(model: IVehicle) {
        this.vehicleModel = model;
    }

    public getAll = async (req: Request, res: Response) => {

        const result: IVehicle[] | boolean = await this.vehicleModel.getAll();

        if (typeof result !== 'boolean') {

            const vehicles: IVehicle[] = result;
            
            return res.status(200).json({
                success: true,
                status: 200,
                message: `${vehicles.length} records fetched`,
                data: vehicles
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

        const { id, email, vehiclename } = req.body;

        if (id) {
            // validaciones para ID ingresado
        }

        if (email) {
            // validaciones para EMAIL ingresado
        }

        if (vehiclename) {
            // validaciones para vehicleNAME ingresado
        }

        if (regexp.test(id_str)) {
            const id: number = parseInt(id_str);

            if ((!isNaN(id)) && (id > 0 && id < 99999999999)) {
                const result: IVehicle | boolean = await this.vehicleModel.getOne(id);

                if (typeof result !== 'boolean') {

                    const vehicle: IVehicle = result;

                    return res.status(200).json({
                        success: true,
                        status: 200,
                        message: `Found`,
                        data: vehicle
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

        const validation = ValidateInput(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: JSON.parse(validation.error.message)
            });
        }

        const newVehicle: IVehicle | boolean = await this.vehicleModel.create(validation.data);

        if (newVehicle) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: `vehicle created`,
                data: newVehicle
            });
        }
        else {
            return res.status(400).json({
                success: false,
                status: 404,
                message: `vehicle not created`,
                data: null
            });
        }

    }

    public update = async (req: Request, res: Response) => {
        const { lastname, name, vehiclename, email, password, country, role, id } = req.body;
        
        // aqui irian las validaciones !!!

        const data: any = {
            lastname,
            name,
            vehiclename,
            email,
            password,
            country,
            role,
            id
        };

        const result: any = await this.vehicleModel.update(data);

        if (result.affectedRows) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: `vehicle updated`,
            });
        }

        res.status(400).json({
            success: false,
            status: 404,
            message: `Not updated`,
        });
    }

    public delete = async (req: Request, res: Response) => {

        const id_str: string = req.body.id;
        const regexp = /^[1-9][0-9]*$/;

        if (regexp.test(id_str)) {
            const id: number = parseInt(id_str);

            if ((!isNaN(id)) && (id > 0 && id < 99999999999)) {
                const deleted: boolean = await this.vehicleModel.delete(id);

                if (deleted) {
                    return res.status(200).json({
                        success: true,
                        status: 200,
                        message: `Deleted succesfully`
                    });
                }
            }
        }

        res.status(404).json({
            success: false,
            status: 404,
            message: `Not deleted`,
        });

    }

}