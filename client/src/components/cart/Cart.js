import React, {useContext, useEffect, useState} from 'react';
import {State} from "../../Store";
import {Helmet} from "react-helmet-async";
import axios from "axios";
import {toast} from "react-toastify";


import CheckOutComponents from "./cartComponents/CheckOutComponents";


const Cart = () => {
    const state = useContext(State);
    const [token] = state.token
    const [cart,setCart] = state.userApi.cart;
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'));
    const [total, setTotal] = useState(0);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cityAddress, setCityAddress] = useState('');
    const [address, setAddress] = useState('');
    const shippingPrice = 600



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
                item.sold = item.quantity
            }
        })
        setCart([...cart])
        updateCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                if (item.quantity === 1){
                    item.quantity = 1
                    item.sold = item.quantity
                }
                else {
                    item.quantity -=1;
                    item.sold = item.quantity
                }
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
                    <CheckOutComponents
                        name={name} total={total}
                        address={address} cart={cart}
                        cityAddress={cityAddress}
                        phone={phone} email={email}
                    />
                </div>

            </div>

        </div>
    );
};

export default Cart;