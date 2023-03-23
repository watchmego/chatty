import { useState } from "react";

import './textInput.css'

export const TextInput = ({ socket }) => {

    const [ message, setMessage ] = useState("");
    const [ typing, setTyping ] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('name')) {
        socket.emit("message",{
            text: message, 
            id: `${socket.id}${Math.random()}`,
            name: localStorage.getItem('name'),
            key: Math.random()
        });
        }
        handleTyping(true);
        setMessage("");
    }

    const handleTyping = (remove = false) => { 
        console.log('handletyping called with remove', remove);
        if(!typing) {
            socket.emit('typing', localStorage.getItem('name'), remove);
            setTyping(true);
            setTimeout(() => setTyping(false), 500);
        }
    }

    return(
        <div className="textContainer">
            <form className="form" onSubmit={handleSend}>
                <textarea
                    type="text"
                    placeholder="Write a message..." 
                    className="textInput"
                    rows="3" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={() => handleTyping()}
                    />
                <button type="submit" className="sendButton">Send</button>
            </form>
            
        </div>
    )
}