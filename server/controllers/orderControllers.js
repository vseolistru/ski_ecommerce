import Order from "../models/Order.js";
import User from "../models/User.js";

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

}

export default new OrderControllers();