import { useEffect, useState } from 'react';

import './infoPanel.css'

export const InfoPanel = ({socket}) => {

    //user list
    const [ users, setUsers ] = useState([])
    //AI 'user' invite status
    const [ aiInvited, setAIInvited] = useState(false);
    const handleAIInvite = () => {
        setAIInvited(true);
        socket.emit("addAI")
    }

    //update user list when somebody joins/leaves
    //need to move this into the chat component, and eventually a separate component
    useEffect(() => {
        socket.on("userList", (data =>  
            {
                console.log('userlist received', data)
                setUsers(data);
            }))
    },[]);



    return(

        <div className="infoPanelBox">
            <button onClick={handleAIInvite}>Invite AI</button>
            <h2>Participants</h2>
            {users.map((user) => {
                return <p key={user.sessionId}>{user.name}</p>
                })}
        </div>
        

    )
}