import { useEffect, useState } from 'react';

import './infoPanel.css'

export const InfoPanel = ({socket}) => {
    const [ users, setUsers ] = useState([])
    const [ aiInvited, setAIInvited] = useState(false);
    const handleAIInvite = () => {
        setAIInvited(true);
        socket.emit("addAI")
    }

    useEffect(() => {
        socket.on("userList", (data => setUsers(data)));
    },[socket, users]);



    return(

        <div className="infoPanelBox">
            <button onClick={handleAIInvite}>Invite AI</button>
            <h2>Participants</h2>
            {users.map((user) => {
                return <p key={user.socketID}>test{user.name}</p>
                })}
        </div>
        

    )
}