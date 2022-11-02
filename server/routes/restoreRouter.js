import express from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import mailService from "../middleware/mailService/mailService.js";
import Token from "../models/Token.js";
import bcrypt from "bcrypt";


const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
const restoreRoute = express.Router();

const generateJwt = (id, email) => {
    return jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '5m'})
}

restoreRoute.post('/reset', async (req,res)=> {
    const {email} = req.body
    const user = await User.findOne({email});
    if(!user) {
        res.json({message:"User is not Exist"}).status(409)
    }
    const token = generateJwt(user._id, email)
    const findToken = await Token.findOne({userId: user._id, token})
    if(findToken){
        res.json({message:"Token is Exist"}).status(409)
    }
    const newToken = await Token.create({userId: user._id, token})
    const link = `http://localhost:3000/forgot-password/${user._id}/${token}`
    await mailService.sendRestorePassword(email, link)
    res.json({message: "Link has been send on email", newToken}).status(200)
})

restoreRoute.get('/reset/:id/:token', async (req,res)=> {
    try{
        const user = await User.findOne({_id:req.params.id})
        if (!user) {
            return res.status(400).json({ message: "Invalid link" });
        }
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).json({ message: "Invalid link" })
        }
        res.status(200).json(token);
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

restoreRoute.post('/reset/:id/:token', async(req, res) => {
    try {
        const {password} = req.body
        if (password.length < 8) {
            return res.status(403).json({message:'Password must contain 8 symbols'})
        }
        if (!strongPassword.test(password)) {
            return res.status(403).json({message:'Password must contain 1 special character, 1 uppercase character, 1 number'})
        }
        const user = await User.findOne({_id: req.params.id});
        if (!user) return res.status(400).send({message: "Invalid link"});

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).send({message: "Invalid link"});
        }
        if (!user.verified) {
            user.verified = true;
        }
        const hashPassword = await bcrypt.hashSync(password, 6);
        user.password = hashPassword;
        await user.save();
        await token.remove();
        res.status(200).json({message: "Password reset successfully"});
   }
   catch (e) {
       res.status(500).send({ message: "Internal Server Error" });
   }

})

export default restoreRoute