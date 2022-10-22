import express from "express";
import userControllers from "../controllers/userControllers.js";

const userRoute = express.Router();

userRoute.post('/', userControllers.registration);
userRoute.get('/activate/:link', userControllers.activate)
userRoute.get('/refreshtoken', userControllers.refreshtoken)

export default userRoute;