import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    productId: {type:String, required: true, unique: true, trim:true},
    slug:{type:String, required:true, unique:true, trim: true},
    title:{type:String, required: true, unique: true},
    description:{type:String, required: true},
    img1:{type:String, },
    img2:{type:String, },
    img3:{type:String, },
    category: {type: String, required: true},
    brand:{type: String, required: true},
    size: {type:Array},
    price: {type:Number, required:true},
    checked: {type:Boolean, default:false},
    sold: {type:Number, default: 0},

}, {timestamps:true})

const Product = mongoose.model('Product' ,ProductSchema);
export default Product;