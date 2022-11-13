import {useEffect, useState} from 'react';
import axios from "axios";


const ProductsAPI = () => {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('');
    const [brands, setBrands] = useState([]);
    const [size, setSize] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [catsResult, setCatsResult] = useState(0)
    const [brandsResult, setBrandsResult] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [priceone, setPriceone] = useState('');
    const [pricetwo, setPricetwo] = useState('')


    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axios.get(`/api/products?page=${page}&category=${category}`)
            setCatsResult(response.data.countProducts)
            setNumberOfPages(response.data.pages)
            setProducts(response.data.products)
        }
        fetchProducts()
    },[callback, page, category])

    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axios.get(`/api/products?page=${page}&brand=${brands}`)
            setBrandsResult(response.data.countProducts)
            setNumberOfPages(response.data.pages)
            setProducts(response.data.products)
        }
        fetchProducts()
    },[callback, page, brands])

    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axios.get(`/api/products?page=${page}&size=${size}`)
            setNumberOfPages(response.data.pages)
            setProducts(response.data.products)
        }
        fetchProducts()
    },[callback, size])

    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axios.get(`/api/products?page=${page}&priceone=${priceone}&pricetwo=${pricetwo}`)
            setNumberOfPages(response.data.pages)
            setProducts(response.data.products)
        }
        fetchProducts()
    },[callback, page, priceone, pricetwo])

    useEffect(()=>{
        const fetchProducts = async () => {
            const response = await axios.get(`/api/products?page=${page}&search=${search}`)
            setNumberOfPages(response.data.pages)
            setProducts(response.data.products)
        }
        fetchProducts()
    },[callback, page, search])

    const gotoPrevious = (page) => {
        setPage(Math.max(0, page - 1));
    };

    const getCategory = (category) => {
        setCategory(category)
    }

    const getBrands = (brand) =>{
        setBrands(brand)
    }

    const getSize = (size) => {
        setSize(size)
    }
    const getPrice = (values) => {
        setPriceone(values[0])
        setPricetwo(values[1])
    }

    const getSearch = (search) => {
        console.log(search)
        setSearch(search)
    }

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        brands: [brands, setBrands],
        size: [size, setSize],
        search: [search, setSearch],
        page: [page, setPage],
        catsResult: [catsResult, setCatsResult],
        brandsResult: [brandsResult, setBrandsResult],
        numberOfPages:[numberOfPages, setNumberOfPages],
        gotoPrevious: gotoPrevious,
        getCategory: getCategory,
        getBrands : getBrands,
        getSize:getSize,
        getPrice: getPrice,
        getSearch: getSearch

    }
};

export default ProductsAPI;