import express from "express";
import userControllers from "../controllers/userControllers.js";
import {Auth} from "../middleware/auth.js";

const userRoute = express.Router();

userRoute.post('/', userControllers.registration);
userRoute.post('/login', userControllers.login);
userRoute.get('/activate/:link', userControllers.activate);
userRoute.get('/refreshtoken', userControllers.refreshtoken);
userRoute.post('/logout', userControllers.logout);
userRoute.get('/infor/:id', Auth, userControllers.getOne);

export default userRoute;