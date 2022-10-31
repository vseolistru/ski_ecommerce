import express from "express";
import dotenv from 'dotenv';
const stripeRoute = express.Router();
dotenv.config();
const KEY = process.env.STRIPE_KEY
import Stripe from 'stripe';
const stripe = new Stripe(KEY);

stripeRoute.post('/payments', (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "RUB",

        },
        (stripeErr, stripeRes) => {

            if(stripeErr){
                res.status(500).json(stripeErr);
            }
            else {
                res.status(200).json(stripeErr);
            }
        }

    );
});

export default stripeRoute;