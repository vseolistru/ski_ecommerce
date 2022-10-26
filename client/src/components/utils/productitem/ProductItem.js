import React from 'react';
import {Helmet} from "react-helmet-async";
import BtnRender from "./BtnRender";


const ProductItem = ({product}) => {
    return (
        <div className="product-card">
            <Helmet>
                <title>SKI & BIKE STORE Catalog of products</title>
            </Helmet>
            <img src={product.img1} alt={product.slug} title={product.slug}/>

            <div className="product_box">
                <h1 title={product.title}>{product.title}</h1>
                <span>{product.price}p.</span>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product}/>
        </div>
    );
};

export default ProductItem;