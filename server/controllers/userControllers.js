import User from '../models/User.js';
import bcrypt from 'bcrypt';
import {v4} from 'uuid';
import mailService from "../middleware/mailService/mailService.js";
import jwt from 'jsonwebtoken';

const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
const emailValidator = new RegExp("^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})");

const generateJwt = (id, name, email, role) => {
    return jwt.sign({id, name, email, role}, process.env.SECRET_KEY, {expiresIn: '3d'})
}

const generateRefresh = (id, name, email, role) => {
    return jwt.sign({id, name, email, role}, process.env.REFRESH_SECRET, {expiresIn: '30d'})
}

class UserControllers {

    async registration(req, res) {
        try {
            const {name, email, role ,password} = req.body;

            if (!email || !password || !name) {
                return res.status(403).json({message:'Значения полей username, email и password не должны быть пустыми'})
            }
            if (!emailValidator.test(email)) {
                return res.status(403).json({message:'Email должен содержать - @ и домен'})
            }
            if (password.length < 8) {
                return res.status(403).json({message:'Пароль должен содержать 8 символов'})
            }
            if (!strongPassword.test(password)) {
                return res.status(403).json({message:'Пароль должен содержать 1 спецсимвол, 1 символ верхнего регистра, 1 число'})
            }
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(403).json({message:'Пользователь с таким email уже существует'})
            }
            const hashPassword = await bcrypt.hashSync(password,6);
            const activationLink = v4();
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`);
            const user = await User.create({email, name, activationLink, role, password: hashPassword});
            const token = generateJwt(user._id, user.name, user.email, user.role)
            const refreshtoken = generateRefresh(user._id, user.name, user.email, user.role)
            res.cookie('refreshtoken', refreshtoken, { httpOnly: true , path: '/api/users/refreshtoken'})

            return res.json({...user._doc, token});
        }
        catch (e) {
            res.status(500).json({message:"Something went wrong"});
        }
    }

     async refreshtoken (req, res) {
        try{
            const rfToken = req.cookies.refreshtoken;
            if(!rfToken){
                return res.status(400).json({message:"Please logging or register"});
            }
            jwt.verify(rfToken, process.env.REFRESH_SECRET, (err, user) => {
                if(err) {
                    return res.status(400).json({message:"Please logging or register"});
                }
                const token = generateJwt(user._id, user.name, user.email, user.role)
                res.json({user, token})
            })
            res.json({rfToken})
        }
         catch (e) {
             res.status(500).json({message: e.message})
        }
    }

    async activate (req, res){
        try {
            const activationLink = req.params.link
            const  userLink = await User.findOne({activationLink})
            if(!userLink){
                res.status(500).json('Некорректная ссылка')
            }
            userLink.isActivated = true
            await userLink.save()
            return res.redirect('http://localhost:5000/')
        }
        catch (e){
            res.status(500).json({message:'is not saved'})
        }
    }

    async login (req, res){
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user){
                return res.status(401).json({message:`user ${email} does not exist`})
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword){
                return res.status(401).json({message:`user password is a wrong`})
            }
            const token = generateJwt(user._id, user.name, user.email, user.role)
            const refreshtoken = generateRefresh(user._id, user.name, user.email, user.role)
            res.cookie('refreshtoken', refreshtoken, { httpOnly: true , path: '/api/users/refreshtoken'})

            return res.json({...user._doc, token});
        }catch (e) {
            res.status(401).json({message: 'Invalid email or password'})
        }
    }

    async logout (req, res){
        try {
            res.clearCookie('refreshtoken', {path: '/api/users/refreshtoken'});
            return res.json({message: 'Logged out'})
        }
        catch (e) {
            res.status(500).json({message: e.message})
        }
    }
    async getOne(req, res) {
        try {
            const user = await User.findById({_id: req.params.id}).select('-password')
            if (!user) {
                return res.status(404).json({message:'User is not found'})
            }
            return res.json({user})
        } catch (e) {
            res.status(500).json({msg: e.msg})
        }
    }
}

export default new UserControllers();