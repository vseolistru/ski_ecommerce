import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import brandRoute from "./routes/brandRoutes.js";
import productRouter from "./routes/productRouter.js";
import stripeRoute from "./routes/stripe.js";
import orderRoute from "./routes/orderRoutes.js";
import restoreRoute from "./routes/restoreRouter.js";
import { WebSocketServer } from 'ws'
import { Server } from "socket.io";
import Message from "./models/Messages.js";
import User from "./models/User.js";
import chatRoute from "./routes/chatRoutes.js";
import Messages from "./models/Messages.js";


dotenv.config();

const DB_URL = process.env.DB_NAME;
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors() );
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({useTempFiles : true, tempFileDir : '/tmp/'}))
app.use(cookieParser() );
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/brand', brandRoute);
app.use('/api/products', productRouter);
app.use('/api/checkout', stripeRoute);
app.use('/api/orders', orderRoute);
app.use('/api/user', restoreRoute);
app.use('/api/chat', chatRoute);



app.get('/', (req, res)=>{
    res.status(200).json({message:'all fine'})

});
async function startApp () {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Serv succ at ${PORT}`))
};


startApp();


const server = app.listen(5050, function() {
    console.log('server up and running on port ' + 5050);
});

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

async function getLastMessagesFromRoom(qFrom, qTo){
    let lastMessages = await Messages.find({$and:[{ from:qFrom }, {to:qTo}]})
    let lastMessage = await Messages.find({$and:[{ from:qTo }, {to:qFrom}]})
    const messages = [...lastMessage, ...lastMessages]
    return messages;
}


io.on('connection', (socket)=> {


    socket.on('user', async (id) => {
        //console.log(socket.id)
        if (id) {
            const members = await User.findById({_id: id});
            io.emit('new-user', members)
        }
    })

    socket.on('join-room', async (qFrom) => {
        let lastMessages = await getLastMessagesFromRoom(qFrom.qFrom, qFrom.qTo);
        io.emit('room-messages', lastMessages);
    })



    socket.on('message-room', async(content) => {
        const newMessage = await Message.create(content);

        let roomMessages = await getLastMessagesFromRoom(content.from, content.to);
        io.emit('room-messages', roomMessages);

        //console.log(roomMessages)
        // sending message to room

    })
})
