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

dotenv.config();

const DB_URL = process.env.DB_NAME;
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({useTempFiles : true, tempFileDir : '/tmp/'}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}))




app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/brand', brandRoute);
app.use('/api/products', productRouter);
app.use('/api/checkout', stripeRoute);
app.use('/api/orders', orderRoute)
app.use('/api/user', restoreRoute);


app.get('/', (req, res)=>{
    res.status(200).json({message:'all fine'})

});
async function startApp () {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Serv succ at ${PORT}`))
};

startApp();