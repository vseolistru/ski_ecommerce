import React, {useContext, useEffect, useState} from 'react';
import {State} from "../../Store";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const Cart = () => {
    const state = useContext(State);
    const [cart,setCart] = state.userApi.cart;
    const [token] = state.token
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'));
    const [total, setTotal] = useState(0);

    const updateCart = async (cart) => {
        await axios.patch(`/api/users/addcart/${store._id}`,
            {cart},
            {headers: {authorization: `Bearer ${token}`}})

        const {data} = await axios.get(`/api/users/infor/${store._id}`,
            {headers: {authorization: `Bearer ${token}`}})

        const {isActivated, role, ...toStore } = data
        localStorage.setItem('Ski&bikeLogin', JSON.stringify(toStore));
        toast.success("Product has been updated in cart")
    }

    useEffect(()=>{
        const getTotal = () => {
            const total = cart.reduce((prev,item) =>{
                return prev + (item.price * item.quantity)
            }, 0);
            setTotal(total)
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


    if(cart.length===0){
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart is Empty</h2>
    };


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
                            <span>Quantity: {product.quantity}</span>
                            <button onClick={() => increment(product._id)}> + </button>
                        </div>
                        <div className="delete" onClick={()=>{removeProduct(product._id)}}>X</div>
                        <div className="to-pay">
                            <p>To pay: {product.price * product.quantity}</p>
                            <p>Sold: {product.sold}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="total">
                <h3>Total: {total}</h3>
                <Link to={"/"} id="btn_view">CheckOut Process</Link>
            </div>
        </div>
    );
};

export default Cart;