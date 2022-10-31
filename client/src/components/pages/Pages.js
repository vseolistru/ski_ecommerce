import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Products from "../products/Products";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Cart from "../cart/Cart";
import NotFound from "../utils/NotFound";
import Detail from "../detail/Detail";
import History from "../history/History";
import Profile from "../profile/Profile";
import ForgotPassword from "../auth/ForgotPasword";
import EmailVerify from "../auth/EmailVerify";
import PasswordReset from "../auth/PasswordReset";




//Switch to Routes
const Pages = () => {
    return (
        <Routes>

            <Route path ='/' exact element={<Products/>}/>
            <Route path ='/:slug' exact element={<Detail/>}/>
            <Route path ='/login' exact element={<Login/>}/>
            <Route path ='/register' exact element={<Register/>}/>
            <Route path ='/forgot-password' exact element={<ForgotPassword/>}/>
            <Route path="/forgot-password/:id/:token" element={<EmailVerify />} />
            <Route path="/password-reset/" element={<PasswordReset />} />
            <Route path ='/cart' exact element={<Cart/>}/>
            <Route path ='/history' exact element={<History/>}/>
            <Route path ='/profile' exact element={<Profile/>}/>


            <Route path ='*' exact element={<NotFound/>}/>
        </Routes>
    );
};

export default Pages;