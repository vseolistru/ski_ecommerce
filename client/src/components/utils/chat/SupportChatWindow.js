import React from 'react';
import {styles} from "./styles";
import EmailForm from "./EmailForm";

const SupportChatWindow = (props) => {

    return (
        <>
        { props.visible ?
            (<div className="transition-5" style={{...styles.supportWindow}}>
                <EmailForm/>
            </div>)
            :(<div className="transition-5" style={{...styles.supportWindowHidden}}>
                <EmailForm/>
            </div>)
        }
        </>
    );
};

export default SupportChatWindow;