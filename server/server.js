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

dotenv.config();

const DB_URL = process.env.DB_NAME;
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(fileUpload({useTempFiles: true}));

app.use('/api/users', userRouter);


app.get('/', (req, res)=>{
    res.status(200).json({message:'all fine'})

});
async function startApp () {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Serv succ at ${PORT}`))
};

startApp();