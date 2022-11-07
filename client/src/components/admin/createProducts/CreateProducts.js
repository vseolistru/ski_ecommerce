import React, {useContext, useState} from 'react';
import {State} from "../../../Store";
import {Helmet} from "react-helmet-async";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    productId: '',
    title: '',
    description: 'Default description',
    price: 0,
    size:[],
    category: '',
    brand: ''
}

const CreateProducts = () => {
    const  state  = useContext(State);
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const token = store.token;
    const [product, setProduct] = useState(initialState);
    const [categories, setCategories] = state.CategoriesAPI.categories;
    const [brands, setBrands] = state.BrandsAPI.brands;
    const [selectedImg1, setSelectedImg1] = useState('');
    const [selectedImg2, setImg2] = useState('');
    const [selectedImg3, setImg3] = useState('');
    const [size, setSize] = useState([])


    const selectFile = (e) => {
        const file = e.target.files[0]
        setSelectedImg1(file)
    }
    console.log(size)
    const handleChangeInput = (e) => {
        e.preventDefault()
        const {name, value} = e.target

        setProduct({size,...product, [name]:value})
    }

    const createProduct = async (e) => {
        e.preventDefault()
        const img1 = selectedImg1
        const img2 = selectedImg2
        const img3 = selectedImg3
        const {data} = await axios.post ('api/products', {...product, img1, img2, img3},
            {headers: { 'Content-Type': 'multipart/form-data',authorization: `Bearer ${token}`}})
        console.log(data.product._id)
        await axios.put (`api/products/${data.product._id}`, {size},
            {headers: {authorization: `Bearer ${token}`}})

        setProduct(initialState)
        setSize([])
        toast.success("You successfully create a product")

    }


    return (

        <div className="create_product">
            <Helmet>
                <title>SKI & BIKE STORE - Create Product admin page</title>
            </Helmet>
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
            </div>
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
                        <textarea type="text" name="description"
                               id="description" required
                                  value={product.description} onChange={handleChangeInput} rows="10"/>
                    </div>
                    <div className="row">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price"
                               id="price" required value={product.price} onChange={handleChangeInput}/>
                    </div>
                    <div className="row">
                        <label htmlFor="size">Size</label>
                        <input type="text" name="size" placeholder="separator : ,"
                               id="size" required onChange={e=>setSize(e.target.value.split(','))}/>
                    </div>
                    <div className="row">
                        <label htmlFor="categories">Category</label>
                        <select name="category"
                                id="categories" required onChange={handleChangeInput}>
                            <option value="" >Please select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.name}>{category.name}</option>
                                ))}
                        </select>
                    </div>
                    <div className="row">
                        <label htmlFor="brands">Brands</label>
                        <select name="brand"
                                id="brands" required onChange={handleChangeInput}>
                            <option value="" >Please select a Brand</option>
                            {brands.map(brand => (
                                <option key={brand._id} value={brand.name}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={createProduct}>Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProducts;