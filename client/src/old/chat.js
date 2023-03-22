import { useState, useEffect, useContext } from 'react';
import { InfoPanel } from '../infoPanel/infoPanel';
import { MessageBox } from '../messageBox/messageBox';
import { TextInput } from '../textBox/textInput';
import { io } from "socket.io-client";
import { Navigate, useParams } from 'react-router-dom';
import { ChatContext } from '../../../App';
import { IOConnect } from '../../socketIO/socketIO';
import { ChatHeader } from '../header/chatHeader'

import './chat.css';



export const Chat = () => {
    //const { name } = useContext(ChatContext);
    console.log('initalising chat');
    const name = localStorage.getItem('name');

    const { room } = useParams();
    const socket = io("http://192.168.178.33:8000", {
        autoConnect: false
    });


    // useEffect(() => {

    //     if(!name) {
    //         console.log('no name found')
    //         navigate('/');
    //     } else {
    //         IOConnect(socket, name, room);
    //     }
        
    // },[name, room])

    const [ messages, setMessages ] = useState({});
    
    console.log(socket);

    return(
            <div className="main">
                {!name ? (
                        <Navigate to='/' />
                    ) : (
                        <IOConnect props={{socket, name, room}}/>
                )}
                <div className="chatContainer">
                    <div className='title'>
                        <ChatHeader room={room}/>
                    </div>
                    <div className="middleRow">
                        <MessageBox />
                        <InfoPanel />
                    </div>
                    <div className="bottomRow">
                        <TextInput props={{socket, room}}/>
                    </div>
                </div>
            </div>
    )
}