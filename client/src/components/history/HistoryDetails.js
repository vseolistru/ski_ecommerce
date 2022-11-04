import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet-async";
import './history.css'

const HistoryDetails = () => {

    const params = useParams();
    const {id} = params;
    const order = JSON.parse(localStorage.getItem('Ski&bikeOrder'))
    const [orders, setOrders] = useState({})
    const tokens = JSON.parse(localStorage.getItem('Ski&bikeToken'))


    useEffect(()=>{
        const fetchData = async () => {
            const {data} = await axios.get(`/api/orders/getone/${id}`,
                {headers: {authorization: `Bearer ${tokens}`}});
            localStorage.setItem('Ski&bikeOrder', JSON.stringify(data));
            setOrders(data)
        }
        fetchData()
    },[])

    if(!order){
        return (
            <h2>No orders are loading History</h2>
        )
    }

    return (
        <>
            <Helmet>
                <title>SKI & BIKE STORE - Order details page</title>
            </Helmet>
            <div className="orders-header">
                <h1>Order Details</h1>
                <p>{id}</p>
            </div>
            <div className="orders">
                <table className="orders-history">
                    <thead>
                    <tr>
                        <th>DATE</th>
                        <th>ITEMS</th>
                        <th>PSYSTEMS</th>
                        <th>PAID</th>
                        <th>CITY</th>
                        <th>DELIVERED</th>
                        <th>TOTAL</th>
                        <th>ORDER ID</th>
                         <th>PHONE</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{order.orderDate}</td>
                        <td>{order.cart.length}</td>
                        <td>{order.paymentSystem}</td>
                        {order.paymentStatus === true ? <td>Paid</td> : <td>Not paid</td>}
                        <td>{order.cityAddress}</td>
                        <td>{order.isDelivered}</td>
                        <td>{order.total}</td>
                        <td>{order._id}</td>
                        <td>{order.phone}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="orders-history">
                    {order.cart.map(item=>
                        ( <div key={item._id}>
                            <div className="order-details" >
                                <div>
                                    <img src={"/"+item.img1} alt = {item.slug}
                                         title={item.slug}/>

                                </div>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p><span>Price: {item.price}p.</span></p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Ordered Size: {item.sizesToSell}</p>
                                    <p>ShippingPrice: {order.shippingPrice}</p>

                                </div>
                            </div>

                        </div>)

                    )}
                <p><span>Status: {order.orderStatus}</span></p>
            </div>
        </>
    );
};


export default HistoryDetails;
