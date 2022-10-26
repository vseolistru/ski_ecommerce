import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Products from "../products/Products";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Cart from "../cart/Cart";
import NotFound from "../utils/NotFound";
import Detail from "../detail/Detail";
import {ToastContainer} from "react-toastify";



//Switch to Routes
const Pages = () => {
    return (
        <Routes>

            <Route path ='/' exact element={<Products/>}/>
            <Route path ='/:slug' exact element={<Detail/>}/>
            <Route path ='/login' exact element={<Login/>}/>
            <Route path ='/register' exact element={<Register/>}/>
            <Route path ='/cart' exact element={<Cart/>}/>

            <Route path ='*' exact element={<NotFound/>}/>
        </Routes>
    );
};

export default Pages;