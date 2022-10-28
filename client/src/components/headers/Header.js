import React, {useState, useContext, useEffect} from 'react';
import {State} from "../../Store";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg"
import {Link} from "react-router-dom";
import axios from "axios";


const Header = () => {
    const value = useContext(State)
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const [cart, setCart] = useState(0)
    const [isAdmin, setIsAdmin] = value.userApi.isAdmin


    useEffect(()=>{
        if(store) {
            setCart(store.cart)
        }
    },[])


    const signOutHandler = async () => {
        await axios.post('/api/users/logout')
        localStorage.removeItem('Ski&bikeLogin');
        setIsAdmin(false)
        window.location.href = '/login';
    }

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt ="" width="30"/>
            </div>
            <div className="logo">
                <h1>
                    {isAdmin ? 'Admin - mode' :
                        (<Link to={'/'}>Ski & Bike store</Link>)
                    }
                </h1>
            </div>
            <ul>
                {isAdmin? '' :<li><Link to={'/'}>Products</Link></li>}
                {isAdmin
                    ? (<>
                        <li ><Link to = '/create_product'>Create Product</Link></li>
                        <li><Link to = '/category'>Categories</Link></li>
                        <li><Link to = '/brand'>Brands</Link></li>
                        <li className="user-name dropdown">
                            admin: <span>{store.name}</span>
                            <div className="dropdown-content">
                                <Link to="/login" onClick={signOutHandler}>Logout</Link>
                            </div>
                        </li>
                    </>)
                    : (null)
                }

                {store && !isAdmin ? <li className="user-name dropdown">user:
                        <span>{store.name}</span>
                        <div className="dropdown-content">
                            <Link to={"/"}>Profile</Link>
                            <Link to={"/"}>History</Link><hr/>
                            <Link to="/login" onClick={signOutHandler}>Logout</Link>
                        </div>
                    </li>
                    : null}
                {!store ? <li><Link to={'/login'}>Login * Register</Link></li> : null}
                <li><img src={Close} alt='' width="30" className="menu"/> </li>

            </ul>
            {isAdmin ? <Link to={"/"}>Orders</Link>
            : <div className="cart-icon">
                    {! cart ? null : <span>{cart.length}</span>}
                <Link to={'/cart'}>
                    <img src ={Cart} alt='' width='30'/>
                </Link>
            </div>}

        </header>
    );
};

export default Header;