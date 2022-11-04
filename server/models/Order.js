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
    isDelivered: {type:String, default: 'inStore'},
    orderStatus:{type:String, default: 'active'},
    deliverAt: {type:Date},
    paidAt:{type:Date},
    orderDate:{type:String}

})

const Order = mongoose.model('Order',OrderSchema)
export default Order;