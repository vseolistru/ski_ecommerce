import React, {useEffect, useState} from 'react';
import axios from "axios";


const ProductsAPI = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.get(`/api/products/`)
        setProducts(response.data.products)
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    return {
        products: [products, setProducts]
    }
};

export default ProductsAPI;