import React, {useContext} from 'react';
import {State} from "../../Store";

const Products = () => {
    const  state  = useContext(State);
   const [products] = state.ProductsAPI.products

    return (
        <div>
            Products List
        </div>
    );
};

export default Products;