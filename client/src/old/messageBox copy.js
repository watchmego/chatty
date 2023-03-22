import { useContext } from 'react'
import { ChatContext } from '../../../App'
import './messageBox.css'

let key = 0;

export const MessageBox = () => {

    
    const { messages } = useContext(ChatContext);
    console.log(messages);

    return(
        <div className="messageContainer">
            {messages.map(message => 
                message.name === localStorage.getItem('name') ? (
                <div className="messageBox" key={key++}>
                    <p className="senderName">ME</p>
                    <div className="messageSender"> 
                        <p>{message.text}</p>
                    </div>
                </div>
                ) : (
                <div className="messageBox" key={key++}>
                    <p>{message.name}</p>
                    <div className="messageRecipient">
                        <p>{message.text}</p>
                    </div>
                </div>
                )
            )}
            <div className="messageStatus">
                <p>Someone is typing...</p>
            </div>
        </div>

    )
}