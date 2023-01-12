import React, {useState} from 'react';
import Calendar from "moedim";
import axios from "axios";
import {toast} from "react-toastify";

const OrderMenu = ({token}) => {

    const [calendar, setCalendar] = useState("calendar-hidden")
    const [value, setValue] = useState(new Date())
    const [orders, setOrders] = useState([])

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

    return (
        <>
            <div className="wrapper">
                <span className={calendar}> <Calendar
                    value={value} onClick onChange={(d)=>dataFilter(d)} /></span>
            </div>
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
        </>

    );
};

export default OrderMenu;