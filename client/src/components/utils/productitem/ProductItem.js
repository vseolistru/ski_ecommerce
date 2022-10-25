import React from 'react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

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
            <div className="row_btn">
                <Link to="#" id ="btn_buy">
                    Buy
                </Link>
                <Link to={`/${product.slug}`} id ="btn_view">
                    View
                </Link>
            </div>
        </div>
    );
};

export default ProductItem;