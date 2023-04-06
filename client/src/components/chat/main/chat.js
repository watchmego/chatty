import { useState, useEffect, useRef } from 'react';
import { InfoPanel } from '../infoPanel/infoPanel';
import { MessageBox } from '../messageBox/messageBox';
import { TextInput } from '../textBox/textInput';
import { Navigate, useParams } from 'react-router-dom';
import { ChatContext } from '../../../App';

import './chat.css';

    




export const Chat = ({socket}) => {

    const { room } = useParams();
    //chat message list
    const [messages, setMessages] = useState([]);
    const [ typingStatus, setTypingStatus ] = useState("");
    const [users, setUsers] = useState([]);
    
    //ref to keep last message in view
    const lastMessageRef = useRef(null);
    const timeoutId = useRef(0);
    

    
useEffect(() => {

    const sessionID = sessionStorage.getItem("sessionID");
    const userID = sessionStorage.getItem("userID");
    console.log(sessionStorage.getItem("name"));
    const name = sessionStorage.getItem("name");
    if(typeof socket.auth === 'undefined') {
        socket.auth = {};
    }
    socket.auth.name = name;
    socket.auth.sessionID = sessionID;
    socket.auth.userID = userID;


    
    const onConnectError = (err) => {
        console.log(`connect_error due to ${err.message}`);
    }
    //update message list when new message arrives 
    const onMessage = (data) => {
        console.log('pre',messages, data);
        setMessages(prev => [...prev, data]);
        
    };
    

    const onConnect = () => {
        
        console.log('connecting socket', socket.auth);
        socket.emit('join', {name: name, roomName: room});
    };

    const onSession = ({ sessionID, userID }) => {
        socket.auth.sessionID = sessionID;
        socket.auth.userID = userID;
        // store it in the sessionStorage
        sessionStorage.setItem("sessionID", sessionID);
        sessionStorage.setItem("userID", userID);
        // save the ID of the user
        socket.userID = userID;
    }

    const onUserUpdate = (data) => {
        setUsers(data);
        console.log(users);
        }

    const onTyping = (user) => {
        if(!user.startsWith(sessionStorage.getItem("name")) ) {
            console.log(user.startsWith(sessionStorage.getItem("name")));
            setTypingStatus(user); 
            clearTimeout(timeoutId.current);
            timeoutId.current = (setTimeout(()=>
            setTypingStatus(""), 5000));
        }
    };

    socket.on('typing', onTyping);
    socket.on("userList", onUserUpdate);
    socket.on("session", onSession);
    socket.on("connect_error", onConnectError);
    socket.on('messageResponse', onMessage);
    socket.on("connect", onConnect);
    socket.connect();
    console.log(socket);
    
    //socket cleanup, remove listeners and null socket
    return () => {
        socket.off('typing');
        socket.off('connect_error');
        socket.off('messageResponse');
        socket.off('connect');
        socket.off('session');
        socket.disconnect();
        socket = null;
    }
},[]);

    //scroll to last message
    useEffect(() =>{
        if(messages.length > 0){
            lastMessageRef.current.scrollIntoView({ behavior:'smooth' });
        }
    },[messages]);
    


    return(
            <>
                {!sessionStorage.getItem('name') ? (
                    <Navigate to='/' />
                    ) : (
                        <div className="main">
                            <InfoPanel socket={socket} users={users}/>
                            <div className="chatContainer">
                                <MessageBox 
                                    messages={messages} 
                                    lastMessageRef={lastMessageRef}
                                    typingStatus={typingStatus}
                                    socket={socket}
                                    />
                                <TextInput socket={socket}/>
                            </div>
                        </div>

                )}
           </>
    )
} 
