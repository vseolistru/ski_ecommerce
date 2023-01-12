import express from "express";
import Brand from "../models/Brands.js"
import {verifyAdmin} from "../middleware/auth.js";
import Product from "../models/Product.js";


const brandRoute = express.Router();

brandRoute.post('/', verifyAdmin, async (req, res)=>{
    try {
        const {name} = req.body;

        const brandName = await Brand.findOne({name})
        if(brandName){
            return res.json({msg: 'Such brand have exist'}).status(406)
        }
        const brand = await Brand.create({name})
        return res.json(brand).status(200)
    } catch (e) {
        return res.json({message: e}).status(500)
    }
});

brandRoute.get('/', async (req, res)=>{
    try {
        const brand = await Brand.find();
        res.json(brand).status(200);
    }
    catch (e) {
        return res.json({message: e}).status(500);
    }
});

//from Products delete to do require
brandRoute.delete('/:id', verifyAdmin, async (req, res)=>{
    try {
        await Brand.findByIdAndDelete(req.params.id);
        res.json({msg: "Brand have been deleted"}).status(200);
    }
    catch (e) {
        return res.json({message: e}).status(500);
    }
});
brandRoute.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const {name} = req.body;

        await Brand.findByIdAndUpdate(
            {_id: req.params.id}, {name})
        const newName = await Brand.find({_id: req.params.id})
        res.json(newName).status(200);
    }
    catch (e) {
        return res.json({message: e}).status(500);
    }
})

export default brandRoute