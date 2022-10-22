import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    name:{type:String, trim: true, required: true, unique: true}

}, {timestamps:true})

const Brand = mongoose.model('Brand' ,BrandSchema);
export default Brand;