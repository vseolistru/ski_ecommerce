import React, {useContext} from 'react';
import {State} from "../../Store";
import ProductItem from "../utils/productitem/ProductItem";
import Loading from "../utils/loading/loading";
import {Helmet} from "react-helmet-async";


const Products = () => {
    const  state  = useContext(State);
    const [products] = state.ProductsAPI.products
    const [isAdmin] = state.userApi.isAdmin


    return (
        <>
            <Helmet>
               <title>SKI & BIKE STORE Catalog products</title>
            </Helmet>
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product.slug}
                                            product={product} isAdmin = {isAdmin} />
                    })
                }
            </div>
           {products.length ===0 && <Loading/>}
        </>
    );
};

export default Products;