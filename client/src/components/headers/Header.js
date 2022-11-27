import React, {useContext, useEffect, useRef, useState} from 'react';
import {State} from "../../Store";
import Menu from "./icon/menu.svg";
import Cart from "./icon/cart.svg"
import {Link} from "react-router-dom";
import { useRanger } from "react-ranger";


const Header = () => {
    const value = useContext(State)
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const [cart, setCart] = value.userApi.cart;
    const [isAdmin, setIsAdmin] = value.userApi.isAdmin
    const [sidebarIsOpen, setSidebarIsOpen] = useState("side-navbar-hidden");
    const [categories] = value.CategoriesAPI.categories
    const getCategory = value.ProductsAPI.getCategory
    const [categoryMenu, setCategoryMenu] = useState("category-menu-hidden ")
    const [brands] = value.BrandsAPI.brands
    const [brandsMenu, setBrandsMenu] = useState("brands-menu-hidden ")
    const getBrands = value.ProductsAPI.getBrands
    const [catsResult] = value.ProductsAPI.catsResult
    const [brandsResult] = value.ProductsAPI.brandsResult
    const [sizesMenu, setSizesMenu] = useState("sizes-menu-hidden ")
    const getSize = value.ProductsAPI.getSize
    const [values, setValues] = useState([2000, 600000]);
    const getPrice = value.ProductsAPI.getPrice
    const getSearch = value.ProductsAPI.getSearch
    const [search, setSearch] = useState('search-hidden')
    const [price, setPrice] = useState("price-hidden")

    const ref = useRef(null)

    //hide side bar by outside click
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

    const { getTrackProps, handles } = useRanger({
        min: 2000,
        max: 600000,
        stepSize: 500,
        values,
        onChange: setValues
    });

    const menuHandler = () =>{
        if (sidebarIsOpen === "side-navbar-hidden") {
            setCategoryMenu("category-menu-hidden")
            setSidebarIsOpen("side-navbar")
        }
        else {
            setSidebarIsOpen("side-navbar-hidden")
        }
    }

    const categoriesHandler = () => {
        if (categoryMenu === "category-menu-hidden") {
            setCategoryMenu("category-menu" )
        }
        else {
            setCategoryMenu("category-menu-hidden")
            getCategory('')
        }
    }

    const brandsHandler = () => {
        if (brandsMenu === "brands-menu-hidden") {
            setBrandsMenu("category-menu" )
        }
        else {
            setBrandsMenu("brands-menu-hidden")
            getBrands('')
        }
    }

    const sizesHandler = () => {
        if (sizesMenu === "sizes-menu-hidden") {
            setSizesMenu("category-menu" )
        }
        else {
            setSizesMenu("sizes-menu-hidden")
            getSize('')

        }
    }

    const searchHandler = () => {
        if (search === "search-hidden") {
            setSearch("search")
        }
        else {
            setSearch("search-hidden")
        }
    }


    const priceHandler = () => {
        if (price === "price-hidden") {
            setPrice("")
        }
        else setPrice("price-hidden")
    }

    const handleSearch = (e) => {
        const search = e.target.value
        getSearch(search)
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
            <div
                className={sidebarIsOpen}
            >
                <div className="">
                    <div className="category-name" ref = {ref}>
                        <strong onClick={categoriesHandler}>Categories: {categories.length}</strong>
                        <p onClick={categoriesHandler}>Products: {catsResult}</p>
                        <span onClick={menuHandler}>X</span>
                    </div>
                    {categories.map((category) => (
                        <div className={categoryMenu} key={category._id}>
                            <button className="" onClick={()=>getCategory(category.name)}>
                                {category.name.replace(/_/, ' ')}
                            </button>
                        </div>

                    ))}
                    <div className="drop-filter">
                        <button className={categoryMenu} style={{marginBottom:"10px"}}
                                onClick={()=>getCategory('')}>Drop Category</button>
                    </div>
                </div>
                <div className="">
                    <div className="category-name">
                        <strong onClick={brandsHandler}>Brands: {brands.length}</strong>
                        <p onClick={brandsHandler}>Products: {brandsResult}</p>
                    </div>
                    {brands.map((brand) => (
                        <div className={brandsMenu} key={brand._id}>
                            <button className="" onClick={()=>getBrands(brand.name)}>
                                {brand.name.replace(/_/, ' ')}
                            </button>
                        </div>

                    ))}
                    <div className="drop-filter">
                        <button className={brandsMenu} style={{marginBottom:"10px"}}
                                onClick={()=>getBrands('')}>Drop Brands</button>
                    </div>
                </div>

                <div className="">
                    <div className="category-name">
                        <strong onClick={sizesHandler}>Sizes</strong>
                    </div>
                        <div className={sizesMenu}>
                            <p>Skies:</p>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(183)}>183</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(186)}>186</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(191)}>191</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(192)}>192</button>
                        </div>
                        <div className={sizesMenu}>
                            <p>Bikes:</p>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(54)}>54</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(56)}>56</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(58)}>58</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(60)}>60</button>
                        </div>
                        <div className={sizesMenu}>
                            <p>Poles:</p>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(155)}>155</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(155)}>165</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(155)}>175</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(155)}>180</button>
                        </div>
                        <div className={sizesMenu}>
                            <p>Boots:</p>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(40)}>40</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(41)}>41</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(42)}>42</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(43)}>43</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(44)}>44</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(45)}>45</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(46)}>46</button>
                        </div>
                        <div className={sizesMenu}>
                            <p>Gloves:</p>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(6)}>6</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(7)}>7</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(8)}>8</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(9)}>9</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(10)}>10</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(11)}>11</button>
                            <button style={{width:"50px",marginLeft:"3px"}} onClick={()=>getSize(12)}>12</button>
                        </div>
                    <div className="drop-filter">
                        <button className={sizesMenu} style={{marginBottom:"10px"}}
                                onClick={()=>getSize('')}>Drop Sizes</button>
                    </div>
                </div>
                <div className="">
                    <div className="category-name">
                        <strong onClick={priceHandler}>Price </strong>

                    </div>
                        <div className={price}
                            {...getTrackProps({
                                style: {
                                margin: "20px 20px 20px 20px",
                                height: "9px",
                                background: "#ffff",
                                boxShadow: "inset 0 1px 2px rgba(0,0,0,.6)",
                                borderRadius: "2px"
                                }})}>
                            {handles.map(({ getHandleProps }) => (
                                <button onClick={()=>getPrice(values)}
                                    {...getHandleProps({
                                        style: {
                                            width: "14px",
                                            height: "34px",
                                            outline: "none",
                                            borderRadius: "0",
                                            background: "#1f4f3b",
                                            border: "solid 1px #888"
                                        }
                                    })}
                                />
                            ))}

                        </div>
                    <div className="drop-filter">
                        <button style={{marginBottom:"10px"}} className={price}
                                onClick={()=>getPrice(["", ""])}>Drop Price</button>
                    </div>
                </div>

                <div className="">
                    <div className="category-name" style={{marginBottom:"30px"}}>
                        <strong onClick={searchHandler}>Search</strong>
                    </div>
                        <div className={search}>
                            <form>
                                <input onChange={handleSearch}></input>
                            </form>
                        </div>
                </div>

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
                                <Link to="/login" onClick={signOutHandler}>Logout</Link>
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
            {isAdmin ? <Link to={"/orders"} className="cart-icon">Orders</Link>
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