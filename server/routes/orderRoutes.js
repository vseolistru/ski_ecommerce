import express from "express";
import {Auth, verifyAdmin} from "../middleware/auth.js";
import orderControllers from "../controllers/orderControllers.js";
const orderRoute = express.Router();

orderRoute.post('/create/:id',Auth, orderControllers.create);
orderRoute.get('/get/:user_id',Auth, orderControllers.getOrder);
orderRoute.get('/getall/:user_id',Auth, orderControllers.getUserOrders);
orderRoute.get('/getone/:id', Auth, orderControllers.getOne);
orderRoute.get('/getadmin/', verifyAdmin,  orderControllers.getAllOrders);
orderRoute.put('/set/:id', verifyAdmin,orderControllers.closeOder)

export default orderRoute;