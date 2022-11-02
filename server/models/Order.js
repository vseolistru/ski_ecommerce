import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user_id :{type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, },
    phone: {type: String, required: true, },
    total:{type:String, required: true },
    paymentSystem: {type: String, required: true, },
    paymentStatus: {type: Boolean, required: true},
    cityAddress: {type: String, required: true},
    address: {type: String, required: true},
    shippingPrice: {type: Number, required: true},
    cart:{type: Array, required:true},
    isDelivered: {type:Boolean, default: false},
    deliverAt: {type:Date},
    paidAt:{type:Date}

},{timestamps:true})

const Order = mongoose.model('Order',OrderSchema)
export default Order;