import React, {useContext, useState, useEffect} from 'react';
import {State} from "../../../Store";
import {Helmet} from "react-helmet-async";
import axios from "axios";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

const initialState = {
    productId: '', title: '', description: 'Default description',
    price: 0, size:[], category: '', brand: '',
}

const CreateProducts = () => {
    const params = useParams();
    const {slug} = params;
    const  state  = useContext(State);
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const token = store.token;
    const [product, setProduct] = useState(initialState);
    const [categories] = state.CategoriesAPI.categories;
    const [brands] = state.BrandsAPI.brands;
    const [selectedImg1, setSelectedImg1] = useState('');
    const [selectedImg2, setImg2] = useState('');
    const [selectedImg3, setImg3] = useState('');
    const [size, setSize] = useState([])

    const [callback, setCallback] = state.ProductsAPI.products;

    useEffect(()=>{
        if (params.slug) {
            const fetchData = async () => {
                const {data} = await axios.get(`/api/products/${params.slug}`,
                    {headers: {authorization: `Bearer ${token}`}})
                const initialState = {
                    productId: data.productId, title: data.title, description: data.description,
                    price: data.price, size: data.size, category: data.category, brand: data.brand,
                    id : data._id
                }
                setProduct(initialState)

            }
            fetchData()
        }
    },[])

    const selectFile = (e) => {
        const file = e.target.files[0]
        setSelectedImg1(file)
    }

    const handleChangeInput = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setProduct({size, ...product, [name]:value})
    }

    const createProduct = async (e) => {
        e.preventDefault()
        const img1 = selectedImg1
        const img2 = selectedImg2
        const img3 = selectedImg3
        const {data} = await axios.post ('/api/products', {...product, img1, img2, img3},
            {headers: { 'Content-Type': 'multipart/form-data',authorization: `Bearer ${token}`}})

        await axios.put (`/api/products/${data.product._id}`, {size},
            {headers: {authorization: `Bearer ${token}`}})
        toast.success(`You successfully create a product ${data.product._id}`)
        setTimeout(()=> {window.location.href = '/createproducts';}, 2000)
    }

    const updateProduct = async (e) =>{
        e.preventDefault();
        await axios.put (`/api/products/${product.id}`, {...product,size},
            {headers: {authorization: `Bearer ${token}`}})
        setCallback(!callback)
        toast.success(`You successfully create a product ${product.title}`)
        setTimeout(()=> {window.location.href = '/';}, 2000)
    }


    return (
        <>
            {params.slug ? <h1>Edit mode {product.title} {product.id}</h1>: <h1>Create Product</h1>}
            <div className="create_product">
                <Helmet>
                    <title>SKI & BIKE STORE - Create Product admin page</title>
                </Helmet>

                {params.slug ? null :(
                <div className="create_product_img">
                    <div className="upload">
                        <input type="file" id="file_up" name="img1"
                               multiple onChange={selectFile}/>
                        <div id="file_img" >
                            <img src="" alt=""/>
                        </div>
                    </div>
                    <div className="upload">
                        <input type="file" id="file_up" onChange={(e)=>setImg2(e.target.files[0])}/>
                        <div id="file_img" >
                            <img src="" alt=""/>
                        </div>
                    </div>
                    <div className="upload">
                        <input type="file" id="file_up" onChange={(e)=>setImg3(e.target.files[0])}/>
                        <div id="file_img" >
                            <img src="" alt=""/>
                        </div>
                    </div>
                </div>)}
                <div>
                    <form >
                        <div className="row">

                            <label htmlFor="product_id">Product ID</label>
                            <input type="text" name="productId"
                                   id="product_id" required value={product.productId}
                                   onChange={handleChangeInput}/>
                        </div>
                        <div className="row">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title"
                                   id="title" required value={product.title} onChange={handleChangeInput}/>
                        </div>
                        <div className="row">
                            <label htmlFor="description">Description</label>
                            {/*<ReactQuill //modules={modules} formats={formats}*/}
                            {/*            value={body} onChange={handleBody}*/}
                            {/*/>*/}
                            <textarea type="text" name="description"
                                   id="description" required
                                      value={product.description} onChange={handleChangeInput} rows="10"
                            style={{whiteSpace:"pre-wrap"}}/>
                        </div>
                        <div className="row">
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price"
                                   id="price" required value={product.price} onChange={handleChangeInput}/>
                        </div>
                        <div className="row">
                            {params.slug ?
                                <label htmlFor="size" style={{color:"crimson"}}>
                                    Size: {product.size}- Length {product.size.length}
                                </label>
                                : <label htmlFor="size">Size</label>}
                            <input type="text" name="size" placeholder="separator : ,"
                                   id="size" required onChange={e=>setSize(e.target.value.split(','))}/>
                        </div>
                        <div className="row">
                            {params.slug ? <label htmlFor="categories" style={{color:"orange"}}>
                                    Category: {product.category}</label>
                                : <label htmlFor="categories">Category</label>}
                            <select name="category"
                                    id="categories" required onChange={handleChangeInput}>
                                <option value="" >Please select a category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="row">
                            {params.slug ? <label htmlFor="brands" style={{color:"orange"}}>
                                    Brands: {product.brand}</label> :
                                <label htmlFor="brands">Brands</label>}
                            <select name="brand"
                                    id="brands" required onChange={handleChangeInput}>
                                <option value="" >Please select a Brand</option>
                                {brands.map(brand => (
                                    <option key={brand._id} value={brand.name}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        {params.slug ? <button onClick={updateProduct}>Update</button>:
                            <button onClick={createProduct}>Create</button>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProducts;

