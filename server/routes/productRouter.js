import express from "express";
import {verifyAdmin} from "../middleware/auth.js";
import productControllers from "../controllers/productControllers.js";
const productRouter  = express.Router();

productRouter.post('/', verifyAdmin, productControllers.create);

productRouter.get('/', productControllers.getAll); // all

productRouter.get('/:slug', productControllers.getOne); //one

productRouter.put('/:id',verifyAdmin, productControllers.update);
productRouter.delete('/:id', verifyAdmin, productControllers.delete);


export default productRouter;