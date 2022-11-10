import {useEffect, useState} from 'react';
import axios from "axios";


const ProductsAPI = () => {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false)



    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axios.get(`/api/products/`)
            setProducts(response.data.products)
        }
        fetchProducts()
    },[callback])

    return {
        products: [products, setProducts],
        callback: [callback, setCallback]
    }
};

export default ProductsAPI;