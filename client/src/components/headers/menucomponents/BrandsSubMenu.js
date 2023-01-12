import React, {useContext, useState} from 'react';
import {State} from "../../../Store";

const BrandsSubMenu = () => {
    const value = useContext(State)
    const [brands] = value.BrandsAPI.brands
    const [brandsMenu, setBrandsMenu] = useState("brands-menu-hidden ")
    const getBrands = value.ProductsAPI.getBrands
    const [brandsResult] = value.ProductsAPI.brandsResult

    const brandsHandler = () => {
        if (brandsMenu === "brands-menu-hidden") {
            setBrandsMenu("category-menu" )
        }
        else {
            setBrandsMenu("brands-menu-hidden")
            getBrands('')
        }
    }

    return (
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
    );
};

export default BrandsSubMenu;