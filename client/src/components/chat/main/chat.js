import { useState, useEffect, useRef } from 'react';
import { InfoPanel } from '../infoPanel/infoPanel';
import { MessageBox } from '../messageBox/messageBox';
import { TextInput } from '../textBox/textInput';
import { io } from "socket.io-client";
import { Navigate, useParams } from 'react-router-dom';
import { ChatContext } from '../../../App';

import './chat.css';

const socket = io("http://192.168.178.33:8000");
socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
socket.on("connect", () => {
    socket.emit("addUser", {name: localStorage.getItem("name"), socketID: socket.id})
});
socket.connect();

export const Chat = () => {

    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])


    return(
            <>
                {!localStorage.getItem('name') ? (
                    <Navigate to='/' />
                    ) : (
                        <div className="main">
                            <InfoPanel socket={socket} />
                            <div className="chatContainer">
                                <MessageBox 
                                    messages={messages} 
                                    lastMessageRef={lastMessageRef}
                                    socket={socket}
                                    />
                                <TextInput socket={socket} />
                            </div>
                        </div>

                )}
           </>
    )
}

                    // <div className="chatContainer">
                    //     <div className='title'>
                    //         <ChatHeader/>
                    //     </div>
                    //     <div className="middleRow">
                    //         <MessageBox messages={messages} />
                    //         <InfoPanel />
                    //     </div>
                    //     <div className="bottomRow">
                    //         <TextInput socket={socket}/>
                    //     </div>
                    // </div> */
                    // </div> */