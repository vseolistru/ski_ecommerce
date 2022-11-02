import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {State} from "../../Store";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

const History = () => {
    const value = useContext(State)
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const token = store.token
    const [user_id, setUser_id] = useState('')
    const [data, setData] = useState([])


    useEffect(()=>{
        setUser_id(store._id)
    },[])

    useEffect(()=>{
        const fetchData = async () => {
            const {data} = await axios.get(`/api/orders/getall/${store._id}`,
                {headers: {authorization: `Bearer ${token}`}})
            setData(data)
        }
        fetchData()
    },[token])

    if (!data) {
        return (
            <>
                <Helmet>
                    <title>SKI & BIKE STORE - Orders page</title>
                </Helmet>
                <div className="orders-error">
                    <h2>You have not orders yet</h2></div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>SKI & BIKE STORE - Orders page</title>
            </Helmet>
            <div className="orders-header">
                <h1>Orders history</h1>
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
                        <th>DETAIL</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    data.map(item =>(
                            <tr key={item._id}>
                                <td>{item.createdAt.substring(0, 10)}</td>
                                <td >{item.cart.length}</td>
                                <td>{item.paymentSystem} </td>
                                {item.paymentStatus === true ? <td>Paid</td> : <td>Not paid</td>}
                                <td>{item.cityAddress}</td>
                                {item.isDelivered === true ? <td>Deliver</td> : <td>Not deliver</td>}
                                <td>{item.total}</td>
                                <td>{item._id}</td>
                                <td><Link to={`/order/${item._id}`}>Details</Link></td>
                            </tr>))
                }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default History;