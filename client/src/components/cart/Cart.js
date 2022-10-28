import React, {useContext, useEffect, useState} from 'react';
import {State} from "../../Store";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

const Cart = () => {
    const state = useContext(State)
    const [cart,setCart] = useState(state.userApi.cart)
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))



    useEffect(()=>{
        if (store) {
            setCart(store.cart)

        }

    },[])

    if(cart[0].length===0){
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart is Empty</h2>

    }
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
                            <button> - </button>
                            <span>Quantity: {product.quantity}</span>
                            <button> + </button>
                        </div>
                        <div className="delete">X</div>
                        <div className="to-pay">
                            <p>To pay: {product.price * product.quantity}</p>
                            <p>Sold: {product.sold}</p>
                        </div>

                    </div>
                </div>
            )}
            <div className="total">
                <h3>Total: 0</h3>
                <Link to={"/"} id="btn_view">CheckOut Process</Link>
            </div>
        </div>
    );
};

export default Cart;