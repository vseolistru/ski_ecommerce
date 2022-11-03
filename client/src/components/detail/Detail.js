import React, {useContext, useEffect, useState} from 'react';
import {State} from "../../Store";
import {Link, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import { Carousel } from 'react-carousel-minimal';
import ProductItem from "../utils/productitem/ProductItem";


const Detail = () => {
    const params = useParams()
    const  state  = useContext(State);
    const {slug} = params
    const [products] = state.ProductsAPI.products
    const [detail, setDetail] = useState([])
    const [sizes, setSizes] = useState([])
    const [selectedSizes, setSelectedSizes] = useState('')
    const addToCart = state.userApi.addToCart

    useEffect(()=>{
        if (params.slug) {
            products.forEach(product => {
                if(product.slug === slug){
                    setDetail(product)
                    setSizes(product.size)
                }
            })
        }
    },[params.slug, products, slug])

    const data = [
        {image: detail.img1, caption: detail.slug},
        {image: detail.img2, caption: detail.slug},
        {image: detail.img3, caption: detail.slug},
    ];
    const captionStyle = {
        fontSize: '1.4em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    return (
        <>
            <div className="detail">
                <Helmet>
                    <title>{`SKI & BIKE STORE - `+ detail.slug }</title>
                </Helmet>
                <Carousel
                    data={data}
                    time={9000}
                    width="850px"
                    height="500px"
                    captionStyle={captionStyle}
                    radius="10px"
                    slideNumber={true}
                    slideNumberStyle={slideNumberStyle}
                    captionPosition="bottom"
                    automatic={true}
                    dots={true}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    slideBackgroundColor="white"
                    slideImageFit="cover"
                    thumbnails={true}
                    thumbnailWidth="100px"
                    style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "30px auto",
                    }}
                />
                <div className="box-detail">
                    <div className="row">
                        <h1>{detail.title}</h1>
                    </div>
                    <span>{detail.price}p.</span>
                    <form>
                        {sizes.map((item, i)=>(
                            <label key={i}>{item}<input type="radio" id="radio" name="sizes" value={item}
                                                         onChange={(e)=>setSelectedSizes(e.target.value)}/></label>
                        ))}
                    </form>
                    <p>{detail.description}</p>
                    <p>Sold: {detail.sold}</p>
                    <Link to ="#" className="cart" onClick={()=>{addToCart(detail, selectedSizes)}}>Buy Now</Link>
                </div>
            </div>
            <div>
                <h2>Related by category</h2>
                <div className="products">
                    {products.map(product => (
                        product.catId === detail.catId
                            ? (<ProductItem key={product.slug} product={product}/>)
                            : (null)
                    ))}
                </div>
                <h2>Related by brand</h2>
                <div className="products">
                    {products.map(product=>{
                        return product.brandId === detail.brandId
                            ? <ProductItem key={product.slug} product={product}/>
                            : null
                    })}
                </div>
            </div>
        </>
    );
};

export default Detail;