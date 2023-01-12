import React, {useContext, useEffect, useState} from 'react';
import {State} from "../../Store";
import {Link, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import Slider from "./detailcomponents/Slider";
import Sizes from "./detailcomponents/Sizes";
import Related from "./detailcomponents/Related";


const Detail = () => {
    const params = useParams()
    const state  = useContext(State);
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

    const setFnSizes = (size) => {
        setSelectedSizes(size)
    }


    return (
        <>
            <div className="detail">
                <Helmet>
                    <title>{`SKI & BIKE STORE - `+ detail.slug }</title>
                </Helmet>
                <Slider data={data}/>
                <div className="box-detail">
                    <div className="row">
                        <h1>{detail.title}</h1>
                    </div>
                    <span>{detail.price}p.</span>
                    <Sizes sizes={sizes} setFnSizes={setFnSizes}/>
                    <p>{detail.description}</p>
                    <p>Sold: {detail.sold}</p>
                    <Link to ="#" className="cart" onClick={()=>{addToCart(detail, selectedSizes)}}>Buy Now</Link>
                </div>
            </div>
            <Related products={products} detail={detail}/>
        </>
    );
};

export default Detail;