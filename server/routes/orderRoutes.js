import express from "express";
import {Auth} from "../middleware/auth.js";
import orderControllers from "../controllers/orderControllers.js";
const orderRoute = express.Router();

orderRoute.post('/create/:id',Auth, orderControllers.create);
orderRoute.get('/get/:user_id',Auth, orderControllers.getOrder);
orderRoute.get('/getall/:user_id',Auth, orderControllers.getOrders);
orderRoute.get('/getone/:id',Auth, orderControllers.getOne);

export default orderRoute;