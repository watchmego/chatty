import { useState } from 'react';
import { InfoPanel } from '../infoPanel/infoPanel';
import { MessageBox } from '../messageBox/messageBox';
import { TextInput } from '../textBox/textInput';

import './chat.css';

export const Chat = ({props}) => {
    console.log('opening chat');
    const [ messages, setMessages ] = useState({});
    if(props) {
        const { name } = props;
    }

    return(
        <div className="main">
            <div className="chatContainer">
                <div className="title">
                    <h1>asdf</h1>
                </div>
                <div className="middle">
                    <MessageBox />
                    <InfoPanel />
                </div>
                <TextInput />
            </div>
        </div>
    )
}