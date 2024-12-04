import { CreateApp } from "./server.js";
import { UserModel } from "./models/UserModel.js";
import { Vehicle } from "./models/VehicleModel.js";

CreateApp({
    User: new UserModel(),
    Vehicle: new Vehicle(),
});