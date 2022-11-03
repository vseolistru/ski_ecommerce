import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

class OrderControllers{

    async create (req, res) {
        try {
            const {order} = req.body
            const user = await User.findById({_id: req.params.id})
            if(user) {
                const updateOrder = await Order.create(order)
                res.status(200).json({...updateOrder._doc})
           }
            else {
                return res.status(404).json({message:'User is not found'})
            }
        }catch (e) {
            res.status(500).json({message: e.message})
        }
    }
    
    async getOrder (req, res) {
        try {
            const order = await Order.findOne({user_id: req.params.user_id})
            if (order) {
                res.json(order).status(200)
            }
            res.status(500).json({message: "order does not exist"})
        }
        catch (e) {
            //res.status(500).json({message: e.message})
        }
    }

    async getUserOrders (req, res) {
        try {
            const orders = await Order.find({user_id: req.params.user_id})
            if (!orders) {
                res.status(500).json({message: "orders does not exist"})
            }
            res.json(orders).status(200)
        }
        catch (e) {
            res.status(500).json({message: e.message})
        }
    }
    async getOne (req, res) {
        try {
            const order = await Order.findOne({_id: req.params.id})
            if (!order) {
                res.status(500).json({message: "order does not exist"})
            }
            res.json(order).status(200)
        }
        catch (e) {
            res.status(500).json({message: e.message})
        }
    }
    async getAllOrders (req, res) {
        try{
            const qNew = req.query.new;
            //http://localhost:5000/api/orders/getadmin?new=true
            const qStatus = req.query.orderStatus;
            //http://localhost:5000/api/orders/getadmin?orderStatus=passed / active
            const qIsDelivered = req.query.isDelivered;
            //http://localhost:5000/api/orders/getadmin?isDelivered=true
            const qCreatedAt = req.query.createdAt;
            const qCreatedTo = req.query.createdTo;
            //http://localhost:5000/api/orders/getadmin?createdAt=2022-11-01&createdTo=2022-11-02
            const qPaymentStatus = req.query.paymentStatus;
            //http://localhost:5000/api/orders/getadmin?paymentStatus=true

            let orders;
            if(qNew) {
                orders = await Order.find().sort({createdAt: -1}).limit(1);
            }
            else if (qStatus) {
                orders = await Order.find({orderStatus:{$in:qStatus,},});
            }
            else if (qPaymentStatus) {
                orders = await Order.find({paymentStatus:{$in:qPaymentStatus,},});
            }
            else if (qIsDelivered) {
                orders = await Order.find({isDelivered: {$in: qIsDelivered}});
            }
            else if (qCreatedAt) {
                orders = await Order.find({createdAt: {$gte: qCreatedAt, $lte: qCreatedTo}});
            }
            else{
                orders = await Order.find();
            }
            res.json(orders).status(200)
        }
        catch (e) {
            return res.json({message: e}).status(500);
        }
    }


}

export default new OrderControllers();