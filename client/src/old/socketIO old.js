import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../App"

export const IOConnect = ({props}) => {

    const { socket, name, room } = props;
    const [isConnected, setIsConnected] = useState(socket.connected);
    const { messages, setMessages } = useContext(ChatContext);

    useEffect(() => {


        const onConnect = () => {
            setIsConnected(true);
        }

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
          });
          
        const onDisconnect = () => {
            setIsConnected(false);
        }
        socket.on("connect", onConnect);
        socket.on("disconnect, onDisconnect");
        socket.onAny((event, ...args) => {
            console.log('catchall',event, args);
        });
        socket.on("chatResponse", (data) => {
            setMessages([...messages, data]);
            console.log('chatresponse listener', messages);
        })
        if(!isConnected) {
            socket.auth = { name }
            socket.connect();
        }
    
        if(room) {
            console.log('joiniung room', room);
            socket.emit('join room', room);
        }
    },[])

    return (<></>)

}

export const sendMessage = (data) => {
    console.log('sending message', data);

    if(data.socket.connected === true) {
        console.log('connected to socket');
        console.log(data);
        data.socket.emit("chat", {
            message: data.message,
            room: data.room,
            name: data.name
        });

    }
}