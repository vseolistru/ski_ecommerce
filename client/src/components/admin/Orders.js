import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import Calendar from 'moedim';
import './orders.css'

const Orders = () => {
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const token = store.token;
    const [orders, setOrders] = useState([])
    const [value, setValue] = useState(new Date())
    const [calendar, setCalendar] = useState("calendar-hidden")
    const order = JSON.parse(localStorage.getItem('Ski&bikeOrder'))
    const [date, setdate] = useState('')

    useEffect(()=>{
        const fetchData = async () => {
            const {data} = await axios.get(`/api/orders/getadmin`,
                {headers: {authorization: `Bearer ${token}`}});
            setOrders(data)
        }
        fetchData()
    },[token])

   // console.log(orders)
    console.log(value)




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
            <span className={calendar}> <Calendar value={value} onChange={(d) => setValue(d)} /></span>
            <div className="filter-orders">
                <button>Last orders</button>
                <button>Status</button>
                <button>Shipment</button>
                <button>PaymentStatus</button>
                <button onClick={handler}>Open Calendar</button>
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
                                    <td>{item.createdAt.substring(0, 10)}</td>
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