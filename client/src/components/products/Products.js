import React, {useContext} from 'react';
import {State} from "../../Store";
import ProductItem from "../utils/productitem/ProductItem";


const Products = () => {
    const  state  = useContext(State);
    const [products] = state.ProductsAPI.products

    return (
        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product.slug} product={product}/>
                })
            }
        </div>
    );
};

export default Products;