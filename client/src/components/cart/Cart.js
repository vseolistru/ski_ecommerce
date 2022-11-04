import React, {useContext, useEffect, useState} from 'react';
import {State} from "../../Store";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
    const state = useContext(State);
    const [token] = state.token
    const [cart,setCart] = state.userApi.cart;
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'));
    const [total, setTotal] = useState(0);
    const KEY = 'pk_test_51LqNxOHzt5ZIBOz4XLtvoqCEJMLlRLQ1DUh8qM6l8uKQOlfrlEL3vH5b25eYsqLPyPZRSrTJFp07faJclgWkeeT200rwe5dU0G';
    const [stripeToken, setStripeToken] = useState(null);
    //shipping data-form init
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cityAddress, setCityAddress] = useState('');
    const [address, setAddress] = useState('');
    const shippingPrice = 600
    //

    const onToken = (token) => {
        setStripeToken(token)
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

                        await axios.post(`/api/orders/create/${store._id}`, {order:
                                    {user_id, email, name, phone, cityAddress, total, orderDate,
                                    address, cart, paymentStatus, paymentSystem, shippingPrice}},
                            {headers: {authorization: `Bearer ${token}`}})
                    }
                    await axios.patch(`/api/users/addcart/${store._id}`,
                        {cart: []},
                        {headers: {authorization: `Bearer ${token}`}});

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
        };
        stripeToken && makeRequest()
    },[stripeToken])

    const updateCart = async (cart) => {
        await axios.patch(`/api/users/addcart/${store._id}`,
            {cart},
            {headers: {authorization: `Bearer ${token}`}});

        const {data} = await axios.get(`/api/users/infor/${store._id}`,
            {headers: {authorization: `Bearer ${token}`}})
        const {isActivated, role, ...toStore} = data
        localStorage.setItem('Ski&bikeLogin', JSON.stringify(toStore));
        toast.success(`Product has been updated in cart`, )

    }

    useEffect(()=>{
        const getTotal = () => {
            const total = cart.reduce((prev,item) =>{
                return prev + (item.price * item.quantity)
            }, 0);
            setTotal(total+shippingPrice)
        }
        getTotal()
    },[cart]);

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCart([...cart])
        updateCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity =1 : item.quantity -=1
            }
        })
        setCart([...cart])
        updateCart(cart)
    }

    const removeProduct = (id) => {
        if(window.confirm('Do you want to remove this product')){
            cart.forEach((item, index) => {
                if (item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            updateCart(cart)
        }
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {amount:{value: total},},
            ],
        });
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

                    await axios.post(`/api/orders/create/${store._id}`, {order:
                                {user_id, email, name, phone, cityAddress, orderDate,
                                    address, cart, paymentStatus, paymentSystem, shippingPrice, total}},
                        {headers: {authorization: `Bearer ${token}`}})
                }
            await axios.patch(`/api/users/addcart/${store._id}`,
                {cart: []},
                {headers: {authorization: `Bearer ${token}`}});

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

    const orderSubmit = async () =>{
        try {
            if (store) {
                const email = store.email
                const user_id = store._id
                const paymentSystem = 'PayCash'
                const paymentStatus = false;
                const date = new Date()
                const orderDate = (date.getDate()+'.'+(Number(date.getMonth())+1)+'.'+date.getUTCFullYear())
                await axios.post(`/api/orders/create/${store._id}`, {order:
                            {user_id, email, name, phone, cityAddress,orderDate,
                                address, cart, paymentStatus, paymentSystem, shippingPrice, total}},
                    {headers: {authorization: `Bearer ${token}`}})
            }
            await axios.patch(`/api/users/addcart/${store._id}`,
                {cart: []},
                {headers: {authorization: `Bearer ${token}`}});

            const {data} = await axios.get(`/api/users/infor/${store._id}`,
                {headers: {authorization: `Bearer ${token}`}});
            localStorage.setItem('Ski&bikeLogin', JSON.stringify(data));
            window.location.href = '/';
        }
        catch (e) {
            toast.error(`Something wrong with server`)
        }
    }

    if(cart.length===0){
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart is Empty</h2>
    };
    const email = store.email

    return (
        <div>
            {cart.map(product =>
                <div className="detail cart" key={product.slug}>
                    <Helmet>
                        <title>{`Cart process - `+ product.slug }</title>
                    </Helmet>
                    <img src={product.img1} alt = {product.slug} title={product.slug} className="img-container"/>
                    <div className="box-detail">
                        <h1>{product.title}</h1>
                        <span>Price: {product.price}p.</span>
                        <h3>Size: {product.sizesToSell}</h3>
                        <div className="amount">
                            <button onClick={() => decrement(product._id)}> - </button>
                            <span>{product.quantity}</span>
                            <button onClick={() => increment(product._id)}> + </button>
                        </div>
                        <div className="delete" onClick={()=>{removeProduct(product._id)}}>X</div>
                        <div className="to-pay">
                            <p>To pay: {product.price * product.quantity}</p>
                            <p>Shipping Price: {shippingPrice}</p>
                            <p>Sold: {product.sold}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="shipping-info">
                <p>Please fill values in the fields, for unblock pay process and checkout</p>
                <form>
                    <label>Username</label>
                    <input type="UserName" required onChange={(e)=> setName(e.target.value)}/>
                    <label>Phone</label>
                    <input type="phone" required onChange={(e)=> setPhone(e.target.value)}/>
                    <label>City</label>
                    <input type="text" required onChange={(e)=> setCityAddress(e.target.value)}/>
                    <label>Address</label>
                    <input type="text" required onChange={(e)=> setAddress(e.target.value)}/>
                </form>
            <div className="total">
                <h3>Total: {total}</h3>

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
                        <button type="submit" onClick={orderSubmit}>Pay Cash</button> </>)
                    }
                </span>
            </div>
            </div>
        </div>
    );
};

export default Cart;