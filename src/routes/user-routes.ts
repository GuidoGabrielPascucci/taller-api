import { Router } from 'express';
import { UserController } from "../controllers/UserController.js";
import { IUser } from '../interfaces/IUser.js';
import { validateLogin } from "../middlewares/auth-mw.js";
import { loginErrorHandler } from "../middlewares/errorHandler-mw.js";
import { validateRegister } from "../middlewares/register-mw.js";

// import multer from "multer";

// const upload = multer({
//     dest: 'public/articulos/fotos/'
// });

export const CreateUserRouter = (userModel: IUser): Router => {
    const UserRouter = Router()
    const userController = new UserController(userModel)
    // UserRouter.use(upload.none())
    UserRouter.get('/', userController.getAll)
    UserRouter.get('/:id', userController.getOne)
    UserRouter.post('/', validateRegister, userController.create)
    UserRouter.put('/', userController.update)
    UserRouter.delete('/:id', userController.delete)
    UserRouter.post('/login', validateLogin, userController.login, loginErrorHandler)
    UserRouter.post('/logout', userController.logout)
    return UserRouter
}