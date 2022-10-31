import express from "express";
import {Auth} from "../middleware/auth.js";
import orderControllers from "../controllers/orderControllers.js";
const orderRoute = express.Router();

orderRoute.post('/create/:id',Auth, orderControllers.create);

export default orderRoute;