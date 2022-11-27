import express from "express";
import * as events from "events";
import Messages from "../models/Messages.js";
const chatRoute = express.Router()
const emitter = new events.EventEmitter()
emitter.setMaxListeners(1024 )

chatRoute.post('/post', async (req, res) => {
    const message = req.body;
    const {content, time, from, date, to, className, displayName} = req.body;
    const newMessage = Messages.create( {content, time, from, date, to, className, displayName})
})

chatRoute.get('/get/', async (req,res) => {
    const qFrom = req.query.from;
    const qTo = req.query.to;
    if (qFrom){
        const message = await Messages.find({$and:[{ from:qFrom }, {to:qTo}]})
        return res.json(message ).status(200)
    }
    const message = await Messages.find()
    return res.json(message).status(200)
})

export default chatRoute

