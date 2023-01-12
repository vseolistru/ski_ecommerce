import React, {useContext, useEffect, useState} from 'react';
import StripeCheckout from "react-stripe-checkout";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import axios from "axios";
import {toast} from "react-toastify";
import {State} from "../../../Store";
const KEY = 'pk_test_51LqNxOHzt5ZIBOz4XLtvoqCEJMLlRLQ1DUh8qM6l8uKQOlfrlEL3vH5b25eYsqLPyPZRSrTJFp07faJclgWkeeT200rwe5dU0G';

const CheckOutComponents = ({name, phone, address, cityAddress, email, total, cart}) => {

    const state = useContext(State);
    const [token] = state.token
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'));
    const shippingPrice = 600
    const [stripeToken, setStripeToken] = useState(null);


    const onToken = (token) => {
        setStripeToken(token)
    }
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {amount:{value: total},},
            ],
        });
    }

    const soldupdate = async (item) =>{
        const sold = item.sold
        await axios.put(`/api/products/sold/${item._id}`,{sold},
            {headers: {authorization: `Bearer ${token}`}})
    }

    useEffect(()=>{
        const makeRequest = async (e) =>{
            try {
                const response = await axios.post('/api/checkout/payments', {
                    tokenId:stripeToken.id,
                    amount: Number(total+'00'),
                });
                if (response.statusText === 'OK') {
                    if (store) {
                        const email = store.email
                        const user_id = store._id
                        const paymentSystem = 'Stripe'
                        const paymentStatus = true;
                        const date = new Date()
                        const orderDate = (date.getDate()+'.'+(Number(date.getMonth())+1)+'.'+date.getUTCFullYear())

                        const {data} = await axios.post(`/api/orders/create/${store._id}`, {order:
                                    {user_id, email, name, phone, cityAddress, total, orderDate,
                                        address, cart, paymentStatus, paymentSystem, shippingPrice}},
                            {headers: {authorization: `Bearer ${token}`}});

                        data.cart.forEach(item => {
                            soldupdate(item)
                        })
                        await axios.patch(`/api/users/addcart/${store._id}`,
                            {cart: []},
                            {headers: {authorization: `Bearer ${token}`}});
                    }

                    const {data} = await axios.get(`/api/users/infor/${store._id}`,
                        {headers: {authorization: `Bearer ${token}`}});
                    const {isActivated, role, ...toStore} = data
                    localStorage.setItem('Ski&bikeLogin', JSON.stringify(toStore));

                    setTimeout(()=>{
                        toast.success(`You have successfully placed  an order`)
                    },1500)
                    window.location.href = '/';
                }
                else {
                    toast.error(`Something went wrong with your payments`)
                }
            }
            catch (e) {
                toast.error(`Something wrong with server`)
            }
        };
        stripeToken && makeRequest()
    },[stripeToken])

    const orderCashSubmit = async () =>{
        try {
            if (store) {
                const email = store.email
                const user_id = store._id
                const paymentSystem = 'PayCash'
                const paymentStatus = false;
                const date = new Date()
                const orderDate = (date.getDate()+'.'+(Number(date.getMonth())+1)+'.'+date.getUTCFullYear())
                const {data} = await axios.post(`/api/orders/create/${store._id}`, {order:
                            {user_id, email, name, phone, cityAddress,orderDate,
                                address, cart, paymentStatus, paymentSystem, shippingPrice, total}},
                    {headers: {authorization: `Bearer ${token}`}})

                data.cart.forEach(item => {
                    soldupdate(item)
                    console.log('success')
                })

                await axios.patch(`/api/users/addcart/${store._id}`,
                    {cart: []},
                    {headers: {authorization: `Bearer ${token}`}});
            }
            const {data} = await axios.get(`/api/users/infor/${store._id}`,
                {headers: {authorization: `Bearer ${token}`}});
            localStorage.setItem('Ski&bikeLogin', JSON.stringify(data));

            setTimeout(()=>{
                toast.success(`You have successfully placed  an order`)
                },1500)
            window.location.href = '/';
        }
        catch (e) {
            toast.error(`Something went wrong`)
        }
    }

    const onApprove = async (data, actions,) => {
        const details = await actions.order.capture();
        try {
            if (details){
                if (store) {
                    const email = store.email
                    const user_id = store._id
                    const paymentSystem = 'PayPal '
                    const paymentStatus = true;
                    const date = new Date()
                    const orderDate = (date.getDate()+'.'+(Number(date.getMonth())+1)+'.'+date.getUTCFullYear())

                    const {data} = await axios.post(`/api/orders/create/${store._id}`, {order:
                                {user_id, email, name, phone, cityAddress, orderDate,
                                    address, cart, paymentStatus, paymentSystem, shippingPrice, total}},
                        {headers: {authorization: `Bearer ${token}`}})

                    console.log('sold update')
                    data.cart.forEach(item => {
                        soldupdate(item)
                    })
                    console.log('after')
                    await axios.patch(`/api/users/addcart/${store._id}`,
                        {cart: []},
                        {headers: {authorization: `Bearer ${token}`}});
                }


                const {data} = await axios.get(`/api/users/infor/${store._id}`,
                    {headers: {authorization: `Bearer ${token}`}});
                const {isActivated, role, ...toStore} = data
                localStorage.setItem('Ski&bikeLogin', JSON.stringify(toStore));
                window.location.href = '/';
            }
            else {
                toast.error(`Something went wrong with your payments`)
            }
        }
        catch (e) {
            toast.error(`Something wrong with server`)
        }
    }

    return (
        <span>
            { !name || !phone || !address || !cityAddress ? null : (<>
                <StripeCheckout name="Free Run Shop" currency="RUB" email={email} billingAddress shippingAddress
                                description="Your total is" amount={Number(total + '00')} token={onToken}
                                stripeKey={KEY}>
                    <button style={{
                        border: "none",
                        width: "150px",
                        height: "48px",
                        borderRadius: 5,
                        padding: "15px",
                        backgroundColor: "black",
                        color: "white",
                        frontWeight: "600",
                        cursor: "pointer",
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "bold"
                    }}>STRIPE pay
                    </button>
                </StripeCheckout>
                <PayPalScriptProvider options={{"client-id": "AfxfwKRxbeU7tsVm5Jvinsktx_eT-hSa4x8ihn2Lxcf46AONdH9s-ke9dgAnCgpI04C_ljSdoAv0jebR",
                    "currency":"RUB"}}>
                    <PayPalButtons createOrder={createOrder} style= {{color : "gold", layout: "horizontal", height: 46}} onApprove={onApprove}/>
                </PayPalScriptProvider>
                <button type="submit" onClick={orderCashSubmit}>Pay Cash</button> </>)
            }
        </span>
    );
};

export default CheckOutComponents;