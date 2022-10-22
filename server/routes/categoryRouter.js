import express from "express";
import Category from "../models/Category.js"
import {verifyAdmin} from "../middleware/auth.js";

const categoryRoute = express.Router();

categoryRoute.post('/', verifyAdmin, async (req,res ) => {
    try {
        const {name} = req.body;
        if (!name) {
            return res.status(403).json({msg:'Value of category cannot be empty!'})
        }
         const catName = await Category.findOne({name})
        if(catName){
            return res.json({msg: 'Such category have exist'}).status(406)
        }
        const updatedCatName = await Category.create({name});
        return res.json(updatedCatName).status(200)
    } catch (e) {
        return res.status(500).json(e)
    }
});

categoryRoute.get('/', async (req, res)=>{
    try {
        const category = await Category.find();
        res.json(category).status(200);
    }
    catch (e) {
        return res.json({message: e}).status(500);
    }
});

//from Products delete to do require
categoryRoute.delete('/:id', verifyAdmin, async (req, res) =>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({msg: "Category have been deleted"}).status(200);
    }
    catch (e) {
        return res.json({message: e}).status(500);
    }
});

categoryRoute.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const {name} = req.body;
        await Category.findByIdAndUpdate(
            {_id: req.params.id}, {name})
        const newName = await Category.find({_id: req.params.id})
        res.json(newName).status(200);
    }
    catch (e) {
        return res.json({message: e}).status(500);
    }
})

export default categoryRoute