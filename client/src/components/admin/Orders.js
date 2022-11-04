import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import Calendar from 'moedim';
import './orders.css'
import {toast} from "react-toastify";


const Orders = () => {
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const token = store.token;
    const [orders, setOrders] = useState([])
    const [value, setValue] = useState(new Date())
    const [calendar, setCalendar] = useState("calendar-hidden")
    const order = JSON.parse(localStorage.getItem('Ski&bikeOrder'))
    const [date, setDate] = useState('')

    useEffect(()=>{
        const fetchData = async () => {
            const {data} = await axios.get(`/api/orders/getadmin`,
                {headers: {authorization: `Bearer ${token}`}});
            setOrders(data)
        }
        fetchData()
    },[token])

    const dropFilters = async () => {
        const {data} = await axios.get(`/api/orders/getadmin`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
        toast.info("you have dropped a filters")
    }

    const activeStatus = async () =>{
        const {data} = await axios.get(`/api/orders/getadmin?orderStatus=active`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
        toast.success("only active orders are show")
    }

    const passedStatus = async () =>{
        const {data} = await axios.get(`/api/orders/getadmin?orderStatus=passed`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
        toast.success("only passed orders are show")
    }

    const inStore = async () =>{
        const {data} = await axios.get(`/api/orders/getadmin?isDelivered=inStore`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
        toast.success("only inStore orders are show")
    }

    const shipping = async () =>{
        const {data} = await axios.get(`/api/orders/getadmin?isDelivered=shipping`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
        toast.success("only shipping orders are show")
    }

    const delivered = async () =>{
        const {data} = await axios.get(`/api/orders/getadmin?isDelivered=Delivered`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
        toast.success("only delivered orders are show")
    }

    const ordersIsPaid = async () => {
        const {data} = await axios.get(`/api/orders/getadmin?paymentStatus=true`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
        toast.success("only paid orders are show")
    }

    const ordersIsNotPaid = async () => {
        const {data} = await axios.get(`/api/orders/getadmin?paymentStatus=false`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
        toast.success("only not paid orders are show")
    }

    const dataFilter = async (d) =>{
        setValue(d)
        const filter = (value.getDate()+'.'+(Number(value.getMonth())+1)+'.'+value.getUTCFullYear())
        const {data} = await axios.get(`/api/orders/getadmin?createdAt=${filter}`,
            {headers: {authorization: `Bearer ${token}`}});
        setOrders(data)
    }


    const handler = () => {
        if (calendar === "calendar-hidden") {
            setCalendar("calendar")
        }
        else {
            setCalendar("calendar-hidden")
        }
    }

    if(!orders){
        return (
            <h2>No orders are loading</h2>
        )
    }

    return (
        <>
            <span className={calendar}> <Calendar
                value={value} onClick onChange={(d)=>dataFilter(d)} /></span>
            <div className="filter-orders ">
                <div className="dropdown">
                    <button>Status</button>
                    <div className="dropdown-content">
                        <span onClick={activeStatus}>active</span>
                        <span onClick={passedStatus}>passed</span>
                    </div>
                </div>
                <div className="dropdown">
                    <button>Shipment</button>
                    <div className="dropdown-content">
                        <span onClick={inStore}>inStore</span>
                        <span onClick={shipping}>shipping</span>
                        <span onClick={delivered}>delivered</span>
                    </div>
                </div>
                <div className="dropdown">
                    <button>PaymentStatus</button>
                    <div className="dropdown-content">
                        <span onClick={ordersIsPaid}>Paid</span>
                        <span onClick={ordersIsNotPaid}>Not paid</span>
                    </div>
                </div>
                <button onClick={handler}>Open Calendar</button>
                <button onClick={dropFilters}>Drop Filter</button>
            </div>
            <div>
                <Helmet>
                    <title>SKI & BIKE STORE - Orders admin page</title>
                </Helmet>
                <div className="orders-header">
                    <h1>Orders: {orders.length}</h1>
                </div>
                <div className="orders">
                    <table className="orders-history">
                        <thead>
                        <tr>
                            <th>DATE</th>
                            <th>OR_STATUS</th>
                            <th>PSYSTEMS</th>
                            <th>PAID</th>
                            <th>CITY</th>
                            <th>DELIVERED</th>
                            <th>TOTAL</th>
                            <th>ORDER ID</th>
                            <th>DETAILS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            orders.map(item =>(
                                <tr key={item._id}>
                                    <td>{item.orderDate}</td>
                                    <td >{item.orderStatus}</td>
                                    <td>{item.paymentSystem} </td>
                                    {item.paymentStatus === true ? <td>Paid</td> : <td>Not paid</td>}
                                    <td>{item.cityAddress}</td>
                                    <td>{item.isDelivered}</td>
                                    <td>{item.total}</td>
                                    <td>{item._id}</td>
                                    <td><Link to={`/orderitem/${item._id}`}>Details</Link></td>
                                </tr>))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Orders;