import React from 'react';
import ProductItem from "../../utils/productitem/ProductItem";

const Related = ({products, detail}) => {
    return (
        <div>
            <h2>Related by category</h2>
            <div className="products">
                {products.map(product => (
                    product.category === detail.category
                        ? (<ProductItem key={product.slug} product={product}/>)
                        : (null)
                ))}
            </div>
            <h2>Related by brand</h2>
            <div className="products">
                {products.map(product=>{
                    return product.brand === detail.brand
                        ? <ProductItem key={product.slug} product={product}/>
                        : null
                })}
            </div>
        </div>
    );
};

export default Related;