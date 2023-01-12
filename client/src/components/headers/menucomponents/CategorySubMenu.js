import React, {useContext, useEffect, useRef, useState} from 'react';
import {State} from "../../../Store";

const CategorySubMenu = ({setSidebarIsOpen, menuHandler}) => {

    const value = useContext(State)
    const [catsResult] = value.ProductsAPI.catsResult
    const getCategory = value.ProductsAPI.getCategory
    const ref = useRef(null)
    const [categoryMenu, setCategoryMenu] = useState("category-menu-hidden ")
    const [categories] = value.CategoriesAPI.categories

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

    const categoriesHandler = () => {
        if (categoryMenu === "category-menu-hidden") {
            setCategoryMenu("category-menu" )
        }
        else {
            setCategoryMenu("category-menu-hidden")
            getCategory('')
        }
    }

    return (
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
    );
};

export default CategorySubMenu;