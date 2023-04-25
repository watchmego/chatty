import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socketInit = () => {
      const onConnectError = (err) => {
        console.log(`connect_error due to ${err.message}`);
      };
      const onMessage = (data) => {
        dispatch(addMessage(data));
      };
  
      const onConnect = () => {
        console.log("connecting socket", socket.auth);
      };
  
      const onSession = ({ sessionID, userID }) => {
        console.log("session data received");
        socket.auth =
                {
                  sessionID: sessionID,
                  userID: userID
                }
        sessionStorage.setItem("sessionID", sessionID);
        sessionStorage.setItem("userID", userID);
        socket.emit("join", { name: name, roomName: room });
      };
  
      const onUserUpdate = (data) => {
        console.log("userdata", data);
        dispatch(addUser(data));
      };
  
      const onTyping = (message) => {
        console.log("typgin");
        if (message !== `${sessionStorage.getItem("name")} is typing`) {
          setTypingStatus(message);
          clearTimeout(timeoutId.current);
          timeoutId.current = setTimeout(() => setTypingStatus(""), 5000);
        }
      };
  
      const onAIJoin = () => {
        setAIActive(true);
      }
  
      socket.on("typing", onTyping);
      socket.on("userList", onUserUpdate);
      socket.on("session", onSession);
      socket.on("connect_error", onConnectError);
      socket.on("messageResponse", onMessage);
      socket.on("connect", onConnect);
      socket.on("aiAdded", onAIJoin);
}

const initialState = {
    socket: io(process.env.REACT_APP_SERVER, {autoConnect: false})
}

const socketSlice = {
    name: "socket",
    initialState,
    reducers: {
        initialise(state) {
            socketInit();
            return state.socket;
        },
        connect(state) {
            state.socket.connect;
        }
    }
}