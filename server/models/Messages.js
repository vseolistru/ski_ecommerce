import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    content: {type:String},
    from: {type:String, required: true},
    time: {type:String},
    date: {type:String},
    to: {type:String},
    displayName:{type:String},
    className:{type: String, required: true}
})


const Message = mongoose.model('Message', MessageSchema);
export default Message