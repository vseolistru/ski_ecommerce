import React, {useContext, useState} from 'react';
import {State} from "../../Store";
import ProductItem from "../utils/productitem/ProductItem";
import Loading from "../utils/loading/loading";
import {Helmet} from "react-helmet-async";



const Products = () => {
    const  state  = useContext(State);
    const [products] = state.ProductsAPI.products
    const [numberOfPages] = state.ProductsAPI.numberOfPages
    const gotoPrevious = state.ProductsAPI.gotoPrevious

    const numsOfPages = new Array(numberOfPages).fill(null).map((v, i) => i);


    return (
        <>
            <Helmet>
               <title>SKI & BIKE STORE Catalog products</title>
            </Helmet>
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product.slug} product={product}/>
                    })
                }
            </div>
           {products.length ===0 && <Loading/>}
            <div className="pagination">
                {numsOfPages.map((pageIndex) => (
                    <button key={pageIndex} onClick={()=>gotoPrevious(pageIndex + 2)}>
                        {pageIndex + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Products;