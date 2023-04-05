import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './messageBox.css'


export const MessageBox = ({ messages, lastMessageRef, socket }) => {
    const navigate = useNavigate();
    const [ typingStatus, setTypingStatus ] = useState("");
    const timeoutId = useRef(0);
    const {room} = useParams()

    const handleLeave = () => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('sessionID');
        socket.emit('leave', room)
        navigate('/');
    }

    useEffect(() => {
        socket.on('typing', (message) => {       
        setTypingStatus(message); 
        clearTimeout(timeoutId.current);
        timeoutId.current = (setTimeout(()=>
            setTypingStatus(""), 5000));
        });
    }, [socket, typingStatus]);


    return(
        <>
            <header className="chatHeader">
                <p>Hangout with Colleagues</p>
                <button className="leaveButton" onClick={handleLeave}>
                    LEAVE CHAT
                </button>
            </header>
            <div className="messageContainer">
                {messages.map(message => 
                    message.name === sessionStorage.getItem('name') ? (
                    <div className="messageBox" key={message.key}>
                        <p className="senderName">ME</p>
                        <div className="messageSender"> 
                            <p>{message.text}</p>
                        </div>
                    </div>
                    ) : (
                    <div className="messageBox" key={message.key}>
                        <p>{message.name}</p>
                        <div className="messageRecipient">
                            <p>{message.text}</p>
                        </div>
                    </div>
                    )
                )}
                <div ref={lastMessageRef}/>
                <div className="messageStatus">
                    <p>{typingStatus}</p>
                </div>
            </div>
        </>
    )
}