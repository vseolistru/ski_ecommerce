import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{type:String, required: true, trim:true, unique: true},
    email:{type:String, required: true, trim:true, unique: true},
    password:{type:String, required: true},
    isActivated: {type:Boolean, default:false},
    role: {type: Number, default:0},
    cart:{type: Array, default: []},
    activationLink:{type:String}

}, {timestamps:true})

const User = mongoose.model('User',UserSchema)
export default User;