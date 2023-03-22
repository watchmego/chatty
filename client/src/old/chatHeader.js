import { useNavigate } from 'react-router-dom';
import './chatHeader.css';

export const ChatHeader = ({room}) => {

    const navigate = useNavigate();
    
    const onLeave = () => {
        localStorage.removeItem('name');
        navigate('/');
    }
    return(
        <header className="title">
            <h1>{room}</h1>
            <button className="leaveButton" onClick={onLeave}>Leave Chat</button>
        </header>
    )
}