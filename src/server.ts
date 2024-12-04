import express from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";
import { CreateUserRouter } from "./routes/user-routes.js";
import { CreateVehicleRouter } from "./routes/vehicle-routes.js";
import { AppModels } from './schemas/app-schema.js';
import { PORT } from "./config/config.js";

export const CreateApp = (models: AppModels) => {
    //#region ServerConfig
    const app = express();
    app.disable('x-powered-by');
    //app.set("key_jwt", "pascucci.guido");              // JWT
    //#endregion
    //#region MWs
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true // Permite el envío de cookies
    }));
    //#endregion
    //#region Comentarios
    // app.use(global)
    // app.use(auth)

    // app.post('/*', (req, res, next) => {
    //     console.log("He entrado a otro middleware, a nivel de aplicación... SÓLO MÉTODO POST !")
    //     next()
    // })
    //#endregion
    //#region RUTAS
    app.use('/users', CreateUserRouter(models.User));
    app.use('/vehicles', CreateVehicleRouter(models.Vehicle));
    //#endregion
    //#region Run app
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    })
    //#endregion
}