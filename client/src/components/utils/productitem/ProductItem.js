import React, {useState} from 'react';
import BtnRender from "./BtnRender";


//const cartItems = JSON.parse(localStorage.getItem('Ski&bikeCart'))
const ProductItem = ({product, isAdmin}) => {
    const [selectedSizes, setSelectedSizes] = useState('')
    //console.log(selectedSizes)


    return (
        <div className="product-card">
            {
                isAdmin && <input type ="checkbox" checked={product.checked}/>
            }
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
            <BtnRender product={product} sizes = {selectedSizes}/>
        </div>
    );
};

export default ProductItem;