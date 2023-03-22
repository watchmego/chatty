import { useState } from "react"
import { sendMessage } from '../../socketIO/socketIO'
import './textInput.css'

export const TextInput = ({props}) => {

    const {socket, room} = props;
    const [message, setMessage] = useState("");

    const handleSend = (e) => {
        console.log(`${localStorage.getItem('name')} sent message: ${message}}`);
        e.preventDefault();
        sendMessage({
            socket: socket, 
            room: room, 
            message: message, 
            name: localStorage.getItem('name')});
        setMessage("");

    }
    return(
        <div className="textContainer">
            <form className="form" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Write a message..." 
                    className="text"
                    rows="3" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                <button type="submit" className="sendButton">Send</button>
            </form>
            
        </div>
    )
}