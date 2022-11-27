import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {styles} from "./styles";
import Loading from "../loading/loading";
import axios from "axios";
import './chat.css'
import io from "socket.io-client";



//.where('displayName', '==', 'Rom')
const EmailForm = () => {
    const [displayName, setName] = useState('')
    const [chat, setChat] = useState('chatWindow-hidden');
    const [vis,setVis] = useState(null)
    const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'));
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [user, setUser] = useState('')
    let socket;

    const sendMessage = () => {
        const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'));
        const displayName =store.name
        const date = new Date()
        socket = io('http://192.168.1.30:5050')
        socket.emit('message-room',({
            displayName,
            from: displayName,
            content: value,
            className: "user",
            to: 'admin',
            date:(date.getHours() +':' + date.getMinutes()+":"+ date.getSeconds() +
                " date: "+date.getDate()+"-"+((date.getMonth())+1)+'-'+ date.getUTCFullYear())
        }))
        setValue('')
    }

    useEffect(()=>{
        const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'))
        if (store){
            const id = store._id
            socket = io('http://192.168.1.30:5050')
            socket.emit('user', (id))
        }
    },[])


    useEffect(()=>{
        const store = JSON.parse(localStorage.getItem('Ski&bikeLogin'));
        if (store) {
            const displayName = store.name
            setUser(displayName)
            socket = io('http://192.168.1.30:5050')
            socket.emit('join-room', ({qFrom: displayName, qTo: 'admin'}))
        }
    },[])



    useEffect(()=>{
        if (user) {
            socket = io('http://192.168.1.30:5050')
            socket.on('room-messages', (lastMessages) => {
                setMessages(lastMessages)
            })
        }
    },[user])


    const menuHandler = () =>{
        if (chat === "chatWindow-hidden") {
            setChat("chatWindow transition-5")
            setVis(1)
        }
        else {
            setChat("chatWindow-hidden")
            setVis(null)
        }
    }

    const crude = [];
    messages.forEach(item =>item.from === user || item.to === user ? crude.push(item) : null )

    const cashChat = () => {
        if(crude) {
            localStorage.setItem('Ski&bikeChat', JSON.stringify(crude));
        }
    }

    cashChat()

    if (!store) return (
    <div
        style={{...styles.topText, position: 'absolute', top:'40px', right:' 0px' , textAlign: 'center'}}>
        Please login to support
        <Loading/>
    </div>
    )

    return (
        <div className={chat}>
            <div style={{...styles.emailFormWindow, ...{height: '100%', opacity: '1'}}}>
                <div style={{height:'0px'}}>
                    { vis ?  null : <div style={styles.stripe}/> }
                </div>

                <div>
                    { vis ?  null : <div style={{...styles.chatWithMeButton,
                        position: 'absolute', top:'40px', right:' 165px' , textAlign: 'center'
                    }}/>  }
                    <div style={styles.topText}>Welcome to support</div>
                    { vis ? (<>
                            <button className="send-message" onClick={sendMessage} >Send</button>
                            <button className="back" onClick={menuHandler}>back</button>
                            <input value={value} onChange={e => setValue(e.target.value)} className="input-message" type="text"/>
                           </>)
                        : (<>
                        <button className="chat-button" onClick={menuHandler} >
                        Start Chat
                        </button>
                        </>)
                    }
                </div>
                <div className="messages">
                    {crude?.map((mess,i)  =>
                        <div key={i} className={mess.className}>
                                <div className="message">
                                    {mess.displayName}: <strong>{mess.content}</strong> <span>{mess.date}</span>

                                </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default EmailForm;