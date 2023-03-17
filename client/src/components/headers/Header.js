import React, {useContext, useEffect, useRef, useState} from 'react';
import {State} from "../../Store";
import Menu from "./icon/menu.svg";
import Cart from "./icon/cart.svg"
import {Link} from "react-router-dom";
import SizeSubMenu from "./menucomponents/SizeSubMenu";
import PriceSubMenu from "./menucomponents/PriceSubMenu";
import SearchSubMenu from "./menucomponents/SearchSubMenu";
import CategorySubMenu from "./menucomponents/CategorySubMenu";
import BrandsSubMenu from "./menucomponents/BrandsSubMenu";
import axios from "axios";



const Header = () => {
    const value = useContext(State)
    const [token] = value.token
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const ref = useRef(null)
    const [cart, setCart] = value.userApi.cart;
    const [isAdmin, setIsAdmin] = value.userApi.isAdmin
    const [sidebarIsOpen, setSidebarIsOpen] = useState("side-navbar-hidden");
    const [categoryMenu, setCategoryMenu] = useState("category-menu-hidden ")

    const handleUpdateUserState = async () =>{
        const {data} = await axios.get(`/api/users/infor/${store._id}`,
        {headers: {authorization: `Bearer ${token}`}})
        const {isActivated, role, ...toStore} = data
        localStorage.setItem('Ski&bikeLogin', JSON.stringify(toStore));
        window.location.href = '/cart';
    }

    useEffect(()=>{
        function handleClick (e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setSidebarIsOpen('side-navbar-hidden')
            }
        }
        document.addEventListener("mousedown", handleClick)
        return ()=>{
            document.removeEventListener("mousedown", handleClick)
        }
    },[ref])

    const menuHandler = () =>{
        if (sidebarIsOpen === "side-navbar-hidden") {
            setCategoryMenu("category-menu-hidden")
            setSidebarIsOpen("side-navbar")
        }
        else {
            setSidebarIsOpen("side-navbar-hidden")
        }
    }


    useEffect(()=>{
        if(store) {
            setCart(store.cart)
        }
    },[])

    const signOutHandler = async () => {
        localStorage.clear()
        setIsAdmin(false)
        //await axios.post('/api/users/logout')
        window.location.href = '/login';
    }


    return (
        <header ref={ref}>
            <div className="menu">
                <button onClick={menuHandler}>
                    <img src={Menu} alt ="" width="30"/>
                </button>
            </div>
            <div className={sidebarIsOpen} >
                <CategorySubMenu setSidebarIsOpen={setSidebarIsOpen} menuHandler={menuHandler}/>
                <BrandsSubMenu/>
                <SizeSubMenu/>
                <PriceSubMenu/>
                <SearchSubMenu/>
            </div>

            <div className="logo">
                <h1>
                    {isAdmin ? 'Admin - mode' :
                        (<Link to={'/'}>Ski & Bike store</Link>)
                    }
                </h1>
            </div>
            <ul>
                <li><Link to={'/'}>Products</Link></li>
                {isAdmin
                    ? (<>
                        <li ><Link to = '/createproducts'>Create Product</Link></li>
                        <li><Link to = '/categories'>Categories</Link></li>
                        <li><Link to = '/brands'>Brands</Link></li>
                        <li className="user-name dropdown">
                            admin: <span>{store.name}</span>
                            <div className="dropdown-content">
                                <Link to="/login" onClick={()=>signOutHandler}>Logout</Link>
                            </div>
                        </li>
                    </>)
                    : (null)
                }

                {store && !isAdmin ? <li className="user-name dropdown">user:
                        <span>{store.name}</span>
                        <div className="dropdown-content">
                            <Link to={"/profile"}>Profile</Link>
                            <Link to={"/history"}>History</Link><hr/>
                            <Link to="/login" onClick={signOutHandler}>Logout</Link>
                        </div>
                    </li>
                    : null}
                {!store ? <li><Link to={'/login'}>Login * Register</Link></li> : null}
                {/*<li><img src={Close} alt='' width="30" className="menu"/> </li>*/}

            </ul>
            {isAdmin ? <Link to={"/orders"}
                className="cart-icon"
              >
                Orders
              </Link>
            : <div className="cart-icon">
                    {! cart ? null : <span>{cart.length}</span>}
                <Link to={'/cart'} onClick={handleUpdateUserState}>
                    <img src ={Cart} alt='' width='30'/>
                </Link>
            </div>}
        </header>
    );
};

export default Header;