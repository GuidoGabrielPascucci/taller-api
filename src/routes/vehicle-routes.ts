import { Router } from 'express';
import { VehicleController } from "../controllers/VehicleController.js";
import { IVehicle } from '../interfaces/IVehicle.js';

// import multer from "multer";

// const upload = multer({
//     dest: 'public/articulos/fotos/'
// });

export const CreateVehicleRouter = (vehicleModel: IVehicle) => {
    const VehicleRouter = Router();
    const vehicleController = new VehicleController(vehicleModel);
    // VehicleRouter.use(upload.none());
    VehicleRouter.get('/', vehicleController.getAll);
    VehicleRouter.get('/:id', vehicleController.getOne);    // le paso el ID, o mejor le paso la PLACA del vehículo?
    VehicleRouter.post('/', vehicleController.create);
    VehicleRouter.put('/', vehicleController.update);
    VehicleRouter.delete('/', vehicleController.delete);
    return VehicleRouter
}