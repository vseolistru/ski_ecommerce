import React, {useRef, useEffect,useState} from 'react';
import {styles} from "./styles";
import './chat.css'
import SupportChatWindow from "./SupportChatWindow";


const ChatButton = (props) => {
    const [hover, setHover] = useState(false)
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)


    useEffect(()=>{
        function handleClick (e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setVisible(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return ()=>{
            document.removeEventListener("mousedown", handleClick)
        }
    },[ref])


    const handlerChat = () => {
        if (!visible) {
            setVisible(true)
        }
        else setVisible(false)
    }


    return (
        <div ref={ref}>
            <SupportChatWindow visible={visible} />
            <div style={props.style} >
                <div className='transition-3'
                     style={{...styles.avatarHello,
                         ...{opacity: hover ? '1' : '0'}}}>
                    Chat
                </div>
                <div className='transition-3'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() =>setHover(false)}
                    onClick={handlerChat}
                    style={{...styles.chatWithMeButton,
                    ...{border: hover ? '4px solid #1f4f3b' : "1px solid #ff9f0f"}}}
                >
                </div>

            </div>
        </div>
    );
};

export default ChatButton;
