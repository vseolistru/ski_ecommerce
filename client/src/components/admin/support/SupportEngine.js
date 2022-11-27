import React, {useContext, useEffect, useRef, useState} from 'react';
import './adminChat.css'
import io from "socket.io-client";
import axios from "axios";

const SupportEngine = () => {
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
    const [value, setValue] = useState('')
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([])
    const [toUser, setToUser] = useState('')
    const [user, setUser] = useState('')
    let socket;

    useEffect(()=>{
        const fetch = async () => {
            const store = JSON.parse(localStorage.getItem('Ski&bikeToken'))
            const {data} = await axios.get(`/api/users/getall`,
                {headers: {authorization: `Bearer ${store}`}})
            setUsers(data)
        }
        fetch()
    },[ ])


    const sendMessage = () => {
        const date = new Date()
        socket = io('http://192.168.1.30:5050')
        const displayName = 'admin'
        const id = store._id
        socket.emit('message-room',({
            displayName,
            from: 'admin',
            content: value,
            className: "admin",
            to: toUser,
            userid: id,
           date:(date.getHours() +':' + date.getMinutes()+":"+ date.getSeconds() +
               " date: "+date.getDate()+"-"+((date.getMonth())+1)+'-'+ date.getUTCFullYear())
        }))
        setValue('')
    }


    useEffect(()=>{
        const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
        const id = store._id
        socket = io('http://192.168.1.30:5050')
        socket.emit('user', (id))
    },[])


    useEffect(()=>{
        setUser('admin')
        socket = io('http://192.168.1.30:5050')
        socket.emit('join-room', ({
            qFrom:user,
            qTo:toUser,
        }))
    },[user, toUser])


    useEffect(()=>{
        socket = io('http://192.168.1.30:5050')
        socket.on('room-messages', (lastMessages)=>{
            setMessages(lastMessages)
        })
    },[])


//TO:{user}
    return (
        <>
            <div className="chat">TO:{toUser}
                {users?.map((item, i)=>
                    <div className="admin-chat" key={i}>
                        <span onClick={()=>setToUser(item.name)}>{item.name}</span>
                    </div>)}

                <div className="admin-messages">
                    {messages?.map((mess, id) =>
                        <div  key={id} className={mess.className}>
                                <div className="admin-message">
                                    {mess.displayName}: {mess.content}
                                    <span>{mess.date}</span>
                                </div>
                        </div>
                    )}
                </div>

            </div>
            <div className="form-bottom">
                <textarea value={value} onChange={e => setValue(e.target.value)} className="admin-input" type="text"/>
                <button className="send" onClick={sendMessage} >Send</button>
            </div>
        </>
    );
};

export default SupportEngine;