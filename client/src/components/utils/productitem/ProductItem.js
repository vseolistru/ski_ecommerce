import React, {useState} from 'react';
import BtnRender from "./BtnRender";
import axios from "axios";
import Loading from "../loading/loading";
import {toast} from "react-toastify";


const ProductItem = ({product, isAdmin}) => {
    const [selectedSizes, setSelectedSizes] = useState('');
    const [loading, setLoading] = useState(false);



    const deleteProduct = async () => {
        try {
            const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'));
            const token = store.token;
            setLoading(true)
            await axios.delete(`/api/products/${product._id}`,
                {headers: {authorization: `Bearer ${token}`}});
            toast.success(`You successfully delete a product ${product.title}`)
            setTimeout(() => {
                window.location.href = '/';
                setLoading(false)
            }, 1300)
        }
        catch (e) {
            toast.success(`You successfully delete a product ${product.title}`)
            setTimeout(() => {
                window.location.href = '/';
                setLoading(false)
            }, 1300)
        }
    }

    if (loading) return <Loading/>

    return (
        <div className="product-card">
            <img src={product.img1} alt={product.slug} title={product.slug}/>
            <div className="product_box">
                <h1 title={product.title}>{product.title}</h1>
                <span>{product.price}p.</span>
                <form>
                    {product.size.map((item, i)=>(
                        <label key={i}>{item}<input type="radio" id="radio" name="sizes" value={item}
                                                    onChange={(e)=>setSelectedSizes(e.target.value)}/></label>
                    ))}
                </form>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product} sizes = {selectedSizes} deleteProduct={deleteProduct}/>
        </div>
    );
};

export default ProductItem;
;