import React, {useContext} from 'react';
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
import HistoryDetails from "../history/HistoryDetails";
import {State} from "../../Store";
import Orders from "../admin/Orders";
import OrdersDetails from "../admin/OrdersDetails";
import Categories from "../admin/categories/Categories";
import Brands from "../admin/categories/Brands";
import CreateProducts from "../admin/createProducts/CreateProducts";




//Switch to Routes
const Pages = () => {
    const value = useContext(State)
    const [isAdmin] = value.userApi.isAdmin


    return (
        <Routes>
            <Route path ='/' exact element={<Products/>}/>
            <Route path ='/:slug' exact element={<Detail/>}/>
            <Route path ='/login' exact element={<Login/>}/>
            <Route path ='/register' exact element={<Register/>}/>
            <Route path ='/forgot-password' exact element={<ForgotPassword/>}/>
            <Route path="/forgot-password/:id/:token" element={<EmailVerify />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path ='/cart' exact element={<Cart/>}/>
            <Route path ='/history' exact element={<History/>}/>
            <Route path ='/profile' exact element={<Profile/>}/>
            <Route path ='/order/:id' exact element={<HistoryDetails/>}/>
            {isAdmin ? <Route path ='/orders' exact element={<Orders/>}/> : null}
            {isAdmin ? <Route path ='/orderitem/:id' exact element={<OrdersDetails/>}/> : null}
            {isAdmin ? <Route path ='/categories' exact element={<Categories/>}/>: null}
            {isAdmin ? <Route path ='/brands' exact element={<Brands/>}/>: null}
            {isAdmin ? <Route path = '/createproducts' exact element={<CreateProducts/>}/> : null }

            <Route path ='*' exact element={<NotFound/>}/>
        </Routes>
    );
};

export default Pages;