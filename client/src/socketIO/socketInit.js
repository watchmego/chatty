// import { io } from "socket.io-client";
// import { useContext, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { messageReducer, userReducer } from "../features/chat/chatSlice";

// export const Socket = (server) => {
//       //initialise socket
//   let socket = io(server);

//   //temporary variables to initialise app 
//   const dispatch = useDispatch();
//   const timeoutId = useRef(null);
//   const room = useParams();
//   const setTypingStatus = () => {return false};



//   const sessionID = sessionStorage.getItem("sessionID");
//     const userID = sessionStorage.getItem("userID");
//     console.log(sessionStorage.getItem("name"));
//     const name = sessionStorage.getItem("name");
//     if(typeof socket.auth === 'undefined') {
//         socket.auth = {};
//     }
//     socket.auth.name = name; 
//     socket.auth.sessionID = sessionID;
//     socket.auth.userID = userID;


    
//     const onConnectError = (err) => {
//         console.log(`connect_error due to ${err.message}`);
//     }
//     //update message list when new message arrives 
//     const onMessage = (data) => {
//         dispatch(messageReducer(data));
        
//     };
    

//     const onConnect = () => {
        
//         console.log('connecting socket', socket.auth);
//         socket.emit('join', {name: name, roomName: room});
//     };

//     const onSession = ({ sessionID, userID }) => {
//         socket.auth.sessionID = sessionID;
//         socket.auth.userID = userID;
//         // store it in the sessionStorage
//         sessionStorage.setItem("sessionID", sessionID);
//         sessionStorage.setItem("userID", userID);
//         // save the ID of the user
//         socket.userID = userID;
//     }

//     const onUserUpdate = (data) => {
//         dispatch(userReducer(data));
//         }

//     const onTyping = (message) => {
//         if(message !== `${sessionStorage.getItem("name")} is typing`) {
//             setTypingStatus(message); 
//             clearTimeout(timeoutId.current);
//             timeoutId.current = (setTimeout(()=>
//             setTypingStatus(""), 5000));
//         }
//     };
    
//   socket.on('typing', onTyping);
//   socket.on("userList", onUserUpdate);
//   socket.on("session", onSession);
//   socket.on("connect_error", onConnectError);
//   socket.on('messageResponse', onMessage);
//   socket.on("connect", onConnect);

//   //cleanup
// //   socket.off('typing');
// //   socket.off('connect_error');
// //   socket.off('messageResponse');
// //   socket.off('connect');
// //   socket.off('session');
// //     
// return {socket};   
// }

import { io } from "socket.io-client";
import { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageReducer, userReducer } from "../features/chat/chatSlice";

export const Socket = (server) => {
   // initialise socket
   
 
   return (<></>);
 }